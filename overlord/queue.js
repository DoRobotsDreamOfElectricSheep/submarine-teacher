var users = [];
var globalUserNumber = 0
var globalJudgeNumber = 0
var onGoingSession = false;

module.exports = {

    setSession: function() {
        onGoingSession = false;
    },

    add: function(uid, isJudge) {
        var username
        if(isJudge) {
            username = 'VIP' + globalJudgeNumber++
        } else {
            username = 'user' + globalUserNumber++;
        }
        user = {
            name: username,
            uid: uid,
            isJudge: isJudge,
            kill: false,
            lastHeardFrom: Date.now()
        };

        var tryAndKill = false;
        if(isJudge) {
            users.unshift(user)
            tryAndKill = true;
        } else {
            users.push(user);
        }

        return {username: username, tryAndKill: tryAndKill}
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
            queue: userArray,
            user: users[0]
        }
    }
}
