(function (Sockets) {
    'use strict';

    var constants  = require('./constants'),
        controller = require('./controller'),
        nodebb     = require('./nodebb');

    var adminSockets = nodebb.adminSockets;

    Sockets.init = function (callback) {
        adminSockets[constants.SOCKET_NAMESPACE] = {};

        //Acknowledgements
        adminSockets[constants.SOCKET_NAMESPACE].chatsStatsGet = Sockets.chatsStatsGet;
        adminSockets[constants.SOCKET_NAMESPACE].primaryDbGet = Sockets.primaryDbGet;

        callback();
    };

    Sockets.chatsStatsGet = function (socket, payload, callback) {
        controller.getChatsStats(callback);
    };

    Sockets.primaryDbGet = function (socket, payload, callback) {
        controller.getPrimaryDatabase(callback);
    };

})(module.exports);