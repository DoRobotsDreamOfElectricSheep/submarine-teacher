// Setup the WebSocket connection and start the player
var client = new WebSocket('ws://52.37.12.182:8084/' );
var endpoint = 'http://52.11.235.138:4000';
// var endpoint = 'http://localhost:4000';
var uid = '';
var username = '';
var canPlay = false;
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
    uid = getGuid();


    $("#transmit-button").click(function(){
        teacher.execute(editor.getValue());
    });

    var $autoBtn = $('#auto-button');
    var $lessonBtn = $('#lesson-button');
    var $lessonPanel = $("#lesson-panel");
    var $editor = $('#editor-panel');
    var $autoPanel = $('#auto-panel');
    var $transmitPanel = $("#transmit-panel");
    var $subRight = $("#sub-right");
    var $subLeft = $("#sub-left");
    var $subForward = $("#sub-forward");
    var $subBackward = $("#sub-backward");
    var $subDive = $("#sub-dive");
    var $subSurface = $("#sub-surface");
    var $playerQueue = $("#playerQueue");
    var $blocker = $(".blocker");

    disable();

    var autoPilot = true;
    var autoSub = submarineFactory.createSubmarine(uid);

    //CLICK HANDLERS: -----------------------------------------

    $autoBtn.mousedown(function(){
        autoPilot = true;
        autoSub.stop();

        $autoBtn.addClass("pressed");
        $lessonBtn.removeClass("pressed");

        $lessonPanel.css("visibility", "hidden");

        $editor.addClass("hidden");
        $autoPanel.removeClass("hidden");

        $transmitPanel.addClass("hidden");
    });

    $lessonBtn.mousedown(function(){
        autoPilot = false;
        autoSub.stop();

        $lessonBtn.addClass("pressed");
        $autoBtn.removeClass("pressed");

        $lessonPanel.css("visibility", "visible");

        $autoPanel.addClass("hidden");
        $editor.removeClass("hidden");

        $transmitPanel.removeClass("hidden");
    });

    $subForward.mousedown(function(){ autoSub.moveForward(); });
    $subForward.mouseup(function(){ autoSub.stop(); });

    $subLeft.mousedown(function(){ autoSub.moveLeft(); });
    $subLeft.mouseup(function(){ autoSub.stop(); });

    $subRight.mousedown(function(){ autoSub.moveRight(); });
    $subRight.mouseup(function(){ autoSub.stop(); });

    $subBackward.mousedown(function(){ autoSub.moveBackward(); });

    $subBackward.mouseup(function(){ autoSub.stop(); });

    $subDive.mousedown(function(){ autoSub.moveDown(); });
    $subDive.mouseup(function(){ autoSub.stop(); });

    $subSurface.mousedown(function(){ autoSub.moveUp(); });
    $subSurface.mouseup(function(){ autoSub.stop(); });

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
                enable();
                return;
            }
            startPolling();
        })
    })

    var pingId;
    var isKilled = false;
    function startPinging() {
        clearInterval(pollId);
        pingId = setInterval(function() {
            if(isKilled) {
                return;
            }
            $.post(endpoint + '/ping', {uid: uid}, function(resp) {
                console.log(resp.statusCode);
                if(resp.statusCode === 089080) {
                    isKilled = true;
                    alert("Someone more important than you needs a turn.");
                    disable();
                    return;
                }
                updatePlayerQueue(resp.queue);
            })
        },3000);
    }

    var pollId = null;
    function startPolling() {
        pollId = setInterval(function() {
            $.post(endpoint + '/userlist', {uid: uid}, function(resp) {
                updatePlayerQueue(resp.queue);
                if(resp.statusCode === 43434230) {
                    startPinging();
                    enable();
                }
            })
        },4000);
    }

    function disable() {
        $blocker.show();
    }

    function enable() {
        $blocker.hide();
    }
});
