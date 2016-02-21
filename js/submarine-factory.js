var submarineFactory = (function(){
    var overlordEndpoint = 'http://52.11.235.138:4000/cmd';

    var isMoveBackward = false;
    var isMoveForward =  false;
    var isMoveRight = false;
    var isMoveLeft = false;
    var isMoveUp = false;
    var isMoveDown = false;

    var moveForward = function(callback) {
        if(isMoveBackward) {
            return(callback('cannot move forwards while moving backwards'));
        }

        post({cmd: 'moveForward'});
        isMoveForward = true;

        return callback;
    }

    var moveBackward = function(callback) {
        if(isMoveForward) {
            return(callback('cannot move backwards while moving forwards'));
        }

        post({cmd: 'moveBackward'});
        isMoveBackward = true;

        return callback;
    }

    var moveLeft = function(callback) {
        if(isMoveRight) {
            return(callback('cannot move left while moving right'));
        }

        post({cmd: 'moveLeft'});
        isMoveLeft = true;

        return callback;
    }

    var moveRight = function(callback) {
        if(isMoveLeft) {
            return(callback('cannot move right while moving left'));
        }

        post({cmd: 'moveRight'});
        isMoveRight = true;

        return callback;
    }

    var moveUp = function(callback) {
        if(isMoveUp) {
            return(callback('cannot move up while moving down'));
        }

        post({cmd: 'moveUp'});
        isMoveUp = true;

        return callback;
    }

    var moveDown = function(callback) {
        if(isMoveDown) {
            return(callback('cannot move down while moving up'));
        }

        post({cmd: 'moveDown'});
        isMoveDown = true;

        return callback;
    }

    var stop = function(callback) {
        post({cmd: 'stop'});

        isMoveBackward = false;
        isMoveForward = false;
        isMoveRight = false;
        isMoveLeft = false;
        isMoveUp = false;
        isMoveDown = false;

        return callback;
    }

    var post = function(message) {
        $.ajax({
            type: 'POST',
            url: overlordEndpoint,
            data: JSON.stringify(message),
            success: function () { console.log(JSON.stringify(message)); },
            error: function(err) { console.log(JSON.stringify(err)); }
        });
    }

    function createSubmarine() {
        return {
            moveForward: moveForward,
            moveBackward: moveBackward,
            moveLeft: moveLeft,
            moveRight: moveRight,
            moveUp: moveUp,
            moveDown: moveDown,
            stop: stop
        }
    }

    return {
        createSubmarine: createSubmarine
    }
})();