var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");

var app = express();

app.use(express.static(__dirname + '/'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
