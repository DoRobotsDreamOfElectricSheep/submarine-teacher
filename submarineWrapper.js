var submarine = {
    overlordEndpoint: 'http://52.11.235.138:4000/cmd',

    isMoveBackward: false,
    isMoveForward: false,
    isMoveRight: false,
    isMoveLeft: false,
    isMoveUp: false,
    isMoveDown:false,

    moveForward: function(callback) {
        if(submarine.isMoveBackward) {
            return(callback('cannot move forwards while moving backwards'));
        }

        submarine.post({cmd: 'moveForward'});
        submarine.isMoveForward = true;

        return callback;
    },

    moveBackward: function(callback) {
        if(submarine.isMoveForward) {
            return(callback('cannot move backwards while moving forwards'));
        }

        submarine.post({cmd: 'moveBackward'});
        submarine.isMoveBackward = true;

        return callback;
    },

    moveLeft: function(callback) {
        if(submarine.isMoveRight) {
            return(callback('cannot move left while moving right'));
        }

        submarine.post({cmd: 'moveLeft'});
        submarine.isMoveLeft = true;

        return callback;
    },

    moveRight: function(callback) {
        if(submarine.isMoveLeft) {
            return(callback('cannot move right while moving left'));
        }

        submarine.post({cmd: 'moveRight'});
        submarine.isMoveRight = true;

        return callback;
    },

    moveUp: function(callback) {
        if(submarine.isMoveUp) {
            return(callback('cannot move up while moving down'));
        }

        submarine.post({cmd: 'moveUp'});
        submarine.isMoveUp = true;

        return callback;
    },

    moveDown: function(callback) {
        if(submarine.isMoveDown) {
            return(callback('cannot move down while moving up'));
        }

        submarine.post({cmd: 'moveDown'});
        submarine.isMoveDown = true;

        return callback;
    },

    stop: function(callback) {
        submarine.post({cmd: 'stop'});

        submarine.isMoveBackward,
        submarine.isMoveForward,
        submarine.isMoveRight,
        submarine.isMoveLeft,
        submarine.isMoveUp,
        submarine.isMoveDown = false;

        return callback;
    },

    post: function(message) {
        $.ajax({
            type: 'POST',
            url: submarine.overlordEndpoint,
            data: JSON.stringify(message),
            success: function () { console.log(message); },
            error: function(err) { console.log(err); }
        });
    }
};
