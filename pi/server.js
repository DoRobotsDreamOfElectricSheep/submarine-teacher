var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var controls = require("./controls.js");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

setInterval(function() {
    request('http://52.11.235.138:4000/update', function (err, response, body) {
        if (err) {
            console.log(err);
            return;
        }

        if(response.statusCode !== 200) {
            console.log('not 200, actual code: ' + response.statusCode);
            return;
        }

        if(!body || !body.length) {
            return;
        }
        try {
            handleResponse(body);
        } catch(err) {
            console.log(err);
        }

    });
},1000);

function handleResponse(response) {
    console.log(response);
    for(i = 0; i < body.length; i++) {
        var cmd = body[i];

        if(cmd === 'moveForward') {
            controls.moveForward();
        } else if(cmd === 'moveBackward') {
            controls.moveBackward();
        } else if(cmd === 'moveLeft') {
            controls.moveLeft();
        } else if(cmd === 'moveRight') {
            controls.moveRight();
        } else if(cmd === 'moveUp') {
            controls.moveUp();
        } else if(cmd === 'moveDown') {
            controls.moveDown();
        } else if(cmd === 'stop') {
            controls.stop();
        }
    }
}

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Pi control server listening at http://%s:%s', host, port);
});
