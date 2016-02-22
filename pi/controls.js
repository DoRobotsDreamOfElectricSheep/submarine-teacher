var Gpio = require("onoff").Gpio;

var MOVE_FORWARD = 16;
var MOVE_BACKWARD = 13;
var MOVE_LEFT = 25;
var MOVE_RIGHT = 17;
var MOVE_UP = 4;
var MOVE_DOWN = 27;

var moveForwardPin;
var moveBackwardPin;
var moveLeftPin;
var moveRightPin;
var moveUpPin;
var moveDownPin;

module.exports = {
    moveForward: function() {
        if(typeof(moveForwardPin) === 'undefined') {
            moveForwardPin = new Gpio(MOVE_FORWARD, 'out');
            return;
        }

        moveForwardPin.read(function(err, value) {
            if(err) {
                console.log(err);
                return;
            }

            var value = value ^ 1;
            moveForwardPin.write(value, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('forward with: ' + value);
            });
        });
    },

    moveBackward: function() {
        if(typeof(moveBackwardPin) === 'undefined') {
            moveBackwardPin = new Gpio(MOVE_BACKWARD, 'out');
            return;
        }

        moveBackwardPin.read(function(err, value) {
            if(err) {
                console.log(err);
                return;
            }

            var value = value ^ 1;
            moveBackwardPin.write(value, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('backward with: ' + value);
            });
        });
    },

    moveLeft: function() {
        if(typeof(moveLeftPin) === 'undefined') {
            moveLeftPin = new Gpio(MOVE_LEFT, 'out');
            return;
        }

        moveLeftPin.read(function(err, value) {
            if(err) {
                console.log(err);
                return;
            }

            var value = value ^ 1;
            moveLeftPin.write(value, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('left with: ' + value);
            });
        });
    },

    moveRight: function() {
        if(typeof(moveRightPin) === 'undefined') {
            moveRightPin = new Gpio(MOVE_RIGHT, 'out');
            return;
        }

        moveRightPin.read(function(err, value) {
            if(err) {
                console.log(err);
                return;
            }

            var value = value ^ 1;
            moveRightPin.write(value, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('right with: ' + value);
            });
        });
    },

    moveUp: function() {
        if(typeof(moveUpPin) === 'undefined') {
            moveUpPin = new Gpio(MOVE_UP, 'out');
            return;
        }

        moveUpPin.read(function(err, value) {
            if(err) {
                console.log(err);
                return;
            }

            var value = value ^ 1;
            moveUpPin.write(value, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('up with: ' + value);
            });
        });
    },

    moveDown: function() {
        if(typeof(moveDownPin) === 'undefined') {
            moveDownPin = new Gpio(MOVE_DOWN, 'out');
            return;
        }

        moveDownPin.read(function(err, value) {
            if(err) {
                console.log(err);
                return;
            }

            var value = value ^ 1;
            moveDownPin.write(value, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('down with: ' + value);
            });
        });
    },

    stop: function() {
        if(moveForwardPin !== undefined) {
            moveForwardPin.write(1, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
            });
        }

        if(moveBackwardPin !== undefined) {
            moveBackwardPin.write(1, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
            });
        }

        if(moveLeftPin !== undefined) {
            moveLeftPin.write(1, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
            });
        }

        if(moveRightPin !== undefined) {
            moveRightPin.write(1, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
            });
        }

        if(moveUpPin !== undefined) {
            moveUpPin.write(1, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
            });
        }

        if(moveDownPin !== undefined) {
            moveDownPin.write(1, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
            });
        }
    }
}

function exit() {
    if(moveForwardPin !== undefined) {
        moveForwardPin.unexport();
    }

    if(moveBackwardPin !== undefined) {
        moveBackwardPin.unexport();
    }

    if(moveLeftPin !== undefined) {
        moveLeftPin.unexport();
    }

    if(moveRightPin !== undefined) {
        moveRightPin.unexport();
    }

    if(moveUpPin !== undefined) {
        moveUpPin.unexport();
    }

    if(moveDownPin !== undefined) {
        moveDownPin.unexport();
    }

    process.exit();
}

process.on('SIGINT', exit)
