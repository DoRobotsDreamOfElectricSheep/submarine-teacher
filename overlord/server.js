var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var queue = require('./queue.js');

var app = express();

var currentPlayingUser = null;
var currentUser = null;
var kill = false;
var lastHeardFromCurrentUser = Date.now();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/update', function(req, res) {
    var load = work;
    work = [];
    res.send(load);
});

app.post('/userlist', function(req, res) {
    if(!req.body || !req.body.uid) {
        res.send('no uid sent');
        return;
    }

    var statusCode = 1568345;
    var list = queue.getList(req.body.uid)
    if(list.isTurn) {
        statusCode = 43434230;
        currentUser = list.user;
        queue.pop();
        currentPlayingUser = list.user.uid;
    }

    res.send({statusCode: statusCode, queue: list.queue});
});

app.post('/ping', function(req, res) {
    if(!req.body || !req.body.uid) {
        res.send('no uid sent');
        return;
    }

    var statusCode = 3423435;
    if(req.body.uid === currentPlayingUser && currentUser.kill == true) {
        statusCode = 089080;
    } else {
        lastHeardFromCurrentUser = Date.now();
    }

    var list = queue.getList(req.body.uid);
    res.send({queue: list.queue, statusCode: statusCode});
});

app.post('/cmd', function(req, res) {
    if(!req.body || !req.body.cmd || !req.body.uid) {
        res.send('no cmd sent');
        return;
    }

    console.log('command');
    if(req.body.uid === currentPlayingUser) {
        console.log('adding work');
        addWork(req.body.cmd);
    }

    res.send();
});

app.post('/user', function(req, res) {
    if(!req.body || !req.body.uid) {
        res.send('no uid sent');
        return;
    }
    var uid = req.body.uid;
    var isJudge = false;
    if(req.body.j) {
        isJudge = true;
    }

    var name = queue.add(uid, isJudge);
    if(currentUser != null && name.tryAndKill && !currentUser.isJudge) {
        currentUser.kill = true;
    }

    res.send(name.username);
});

setInterval(function() {
    if(lastHeardFromCurrentUser === null) {
        return;
    }

    var diff = (Date.now() - lastHeardFromCurrentUser)/1000;
    if(diff > 10) {
        queue.setSession();
        var user = queue.grabNextUser();
        if(user === null) {
            lastHeardFromCurrentUser = Date.now();
        } else {
            if((Date.now() - user.lastHeardFrom)/1000 > 10) {
                queue.pop();
            }
        }
    }
},10000);

var work = [];
function addWork(cmd) {
    work.push(cmd)
}

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Overlord listening at http://%s:%s', host, port);
});
