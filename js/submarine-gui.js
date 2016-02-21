// Setup the WebSocket connection and start the player
var client = new WebSocket('ws://52.37.12.182:8084/' );
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

$("#auto-button,#lesson-button").mousedown( function() {
    $autoBtn.toggleClass("pressed");
    $lessonBtn.toggleClass("pressed");

    $editor.toggleClass("hidden");
    $autoPanel.toggleClass("hidden")
    $transmitPanel.toggleClass("hidden");
});
