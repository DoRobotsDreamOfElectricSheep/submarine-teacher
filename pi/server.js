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

        if(body || body.length) {
            return;
        }

        handleResponse(body);
    });
},1000);

function handleResponse(response) {
    if(response === 'moveForward') {
        controls.moveForward();
    }
}

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    // controls.moveForward();
    // controls.moveBackward();
    console.log('Pi control server listening at http://%s:%s', host, port);
});
