(function (Sockets) {
    'use strict';

    var constants  = require('./constants'),
        controller = require('./controller'),
        nodebb     = require('./nodebb');

    var adminSockets  = nodebb.adminSockets,
        serverSockets = nodebb.serverSockets,
        emitNamespace = 'admin.plugins.' + constants.SOCKET_NAMESPACE + '.';

    Sockets.init = function (callback) {
        adminSockets[constants.SOCKET_NAMESPACE] = {};

        //Acknowledgements
        adminSockets[constants.SOCKET_NAMESPACE].chatsStatsGet = Sockets.chatsStatsGet;
        adminSockets[constants.SOCKET_NAMESPACE].primaryDbGet = Sockets.primaryDbGet;
        adminSockets[constants.SOCKET_NAMESPACE].chatsPurgeStart = Sockets.chatsPurgeStart;
        adminSockets[constants.SOCKET_NAMESPACE].sanitizeStart = Sockets.sanitizeStart;

        callback();
    };

    Sockets.chatsStatsGet = function (socket, payload, callback) {
        controller.getChatsStats(callback);
    };

    Sockets.chatsPurgeStart = function (socket, payload, callback) {
        controller.startChatsPurgeProcess(callback);
    };

    Sockets.emit = function (eventName, payload) {
        serverSockets.emit(emitNamespace + eventName, payload);
    };

    Sockets.primaryDbGet = function (socket, payload, callback) {
        controller.getPrimaryDatabase(callback);
    };

    Sockets.sanitizeStart = function (socket, payload, callback) {
        controller.startSanitize(payload, function (error) {
            //NOOP async process has finished
        });
        callback(null);
    };

})(module.exports);