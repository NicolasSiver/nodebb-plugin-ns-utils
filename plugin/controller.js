/**
 * Created by Nicolas on 10/13/15.
 */
(function (Controller) {
    'use strict';

    var async     = require('async'),

        constants = require('./constants'),
        nodebb    = require('./nodebb'),
        sockets   = require('./sockets');

    var dbClient = nodebb.db.client,
        nconf    = nodebb.nconf;

    // Messages, documents:
    // message - 'message:5' [Hash]
    // message meta - 'messages:uid:1001:to:239', includes only message id and time [Sorted]
    // chat - 'uid:1:chats', includes uid of companion and time [Sorted]

    Controller.getChatsStats = function (done) {
        async.parallel({
            messagesCount: function (callback) {
                dbClient.collection('objects').count({_key: /^message:\d+$/}, callback);
            },
            chatsCount   : function (callback) {
                dbClient.collection('objects').count({_key: /^uid:\d+:chats$/}, callback);
            }
        }, done);
    };

    Controller.getPrimaryDatabase = function (done) {
        done(null, nconf.get('database'));
    };

    Controller.startChatsPurgeProcess = function (done) {
        sockets.emit(constants.EVENT_CHATS_WILL_PURGE);
        done(null, {message: 'Purging chats...'});
        setTimeout(function () {
            sockets.emit(constants.EVENT_CHATS_DID_PURGE);
        }, 4000);
    };

})(module.exports);