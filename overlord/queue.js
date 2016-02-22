var users = [];
var globalUserNumber = 0
var onGoingSession = false;

module.exports = {

    setSession: function() {
        onGoingSession = false;
    },

    add: function(uid) {
        var username = 'user' + globalUserNumber++;
        user = {
            name: username,
            uid: uid,
            lastHeardFrom: Date.now()
        };

        users.push(user);
        return username;
    },

    pop: function() {
        users.shift();
    },

    grabNextUser: function() {
        if(users.length === 0) {
            return null;
        }

        return users[0];
    },

    getList: function(uid) {
        var position = -1;
        var isTurn = false;
        var userArray = [];

        for(i = 0; i < users.length; i++) {
            var user = users[i];
            if(user.uid === uid) {
                position = i;
                user.lastHeardFrom = Date.now();
                users[i] = user;
            }
            userArray.push(user.name);
        }

        if(users.length > 0 && position === 0 && !onGoingSession) {
            isTurn = true;
            onGoingSession = true;
        }

        return {
            isTurn: isTurn,
            queue: userArray
        }
    }
}
