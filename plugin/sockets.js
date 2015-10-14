(function (Sockets) {
    'use strict';

    var constants  = require('./constants'),
        controller = require('./controller'),
        nodebb     = require('./nodebb');

    var adminSockets = nodebb.adminSockets;

    Sockets.init = function (callback) {
        //Acknowledgements
        adminSockets[constants.SOCKET_NAMESPACE].chatsStatsGet = Sockets.chatsStatsGet;

        callback();
    };

    Sockets.chatsStatsGet = function (socket, payload, callback) {
        controller.getChatsStats(callback);
    };

})(module.exports);