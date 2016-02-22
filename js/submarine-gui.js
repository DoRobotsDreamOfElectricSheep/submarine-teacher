// Setup the WebSocket connection and start the player
var client = new WebSocket('ws://52.37.12.182:8084/' );
var endpoint = 'http://52.11.235.138:4000';
// var endpoint = 'http://localhost:4000';
var uid = '';
var username = '';
var canvas = document.getElementById('vision');
var player = new jsmpeg(client, {canvas:canvas});

var lessonEditor = ace.edit("lesson");
lessonEditor.setTheme("ace/theme/monokai");
lessonEditor.getSession().setUseWrapMode(true)
lessonEditor.session.setMode("ace/mode/javascript");
lessonEditor.setShowPrintMargin(false);
lessonEditor.renderer.setShowGutter(false);
lessonEditor.setOptions({
    highlightActiveLine: false,
    readOnly: true
});

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setUseWrapMode(true)
editor.session.setMode("ace/mode/javascript");
editor.setShowPrintMargin(false);

var teacher = Teacher.Create(lessonEditor);
teacher.nextLesson();

$(function(){
    $("#transmit-button").click(function(){
        teacher.execute(editor.getValue());
    });
});

var $autoBtn = $('#auto-button');
var $lessonBtn = $('#lesson-button');
var $editor = $('#editor-panel');
var $autoPanel = $('#auto-panel');
var $transmitPanel = $("#transmit-panel");
var $playerQueue = $('#playerQueue');

$("#auto-button,#lesson-button").mousedown( function() {
    $autoBtn.toggleClass("pressed");
    $lessonBtn.toggleClass("pressed");

    $editor.toggleClass("hidden");
    $autoPanel.toggleClass("hidden")
    $transmitPanel.toggleClass("hidden");
});

(function() {
    uid = getGuid();
    $.post(endpoint + '/user', {uid: uid}, function(resp) {
        if(resp === null || !resp.length) {
            return;
        }

        username = resp;
        $.post(endpoint + '/userlist', {uid: uid}, function(resp) {
            console.log(resp.statusCode);
            updatePlayerQueue(resp.queue);
            if(resp.statusCode === 43434230) {
                updatePlayerQueue(resp.queue);
                startPinging();
                return;
            }
            startPolling();
        })
    })
})();

function updatePlayerQueue(players) {
    $playerQueue.text('');
    for (var i in players) {
        var position = parseInt(i) + 1;
        if(username === players[i]) {
            $playerQueue.append(position + '. you</br>');
        } else {
            $playerQueue.append(position + '. ' + players[i] + '</br>');
        }
    }
}

function getGuid() {
    return (
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    );
}

function startPinging() {
    clearInterval(pollId);
    setInterval(function() {
        $.post(endpoint + '/ping', {uid: uid}, function(resp) {
            updatePlayerQueue(resp.queue);
        })
    },3000);
}

var pollId = null;
function startPolling() {
    pollId = setInterval(function() {
        $.post(endpoint + '/userlist', {uid: uid}, function(resp) {
            if(resp.statusCode === 43434230) {
                startPinging();
            }
            updatePlayerQueue(resp.queue);
        })
    },4000);
}