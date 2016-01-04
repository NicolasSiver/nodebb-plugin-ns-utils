(function (Controller) {
    'use strict';

    var async     = require('async'),

        constants = require('./constants'),
        nodebb    = require('./nodebb'),
        sockets   = require('./sockets'),
        sanitize = require('./sanitize');

    var dbClient = nodebb.db.client,
        nconf    = nodebb.nconf;

    var nbbMessage     = /^message:\d+$/,
        nbbMessageMeta = /^messages:uid:\d+:to:\d+$/,
        nbbChat        = /^uid:\d+:chats$/;

    // Messages, documents:
    // message - 'message:5' [Hash]
    // message meta - 'messages:uid:1001:to:239', includes only message id and time [Sorted]
    // chat - 'uid:1:chats', includes uid of companion and time [Sorted]

    Controller.getChatsStats = function (done) {
        async.parallel({
            messagesCount: function (callback) {
                getCollection().count({_key: nbbMessage}, callback);
            },
            chatsCount   : function (callback) {
                getCollection().count({_key: nbbChat}, callback);
            },
            metaCount    : function (callback) {
                getCollection().count({_key: nbbMessageMeta}, callback)
            }
        }, done);
    };

    Controller.getPrimaryDatabase = function (done) {
        done(null, nconf.get('database'));
    };

    Controller.startChatsPurgeProcess = function (done) {
        sockets.emit(constants.EVENT_CHATS_WILL_PURGE);
        done(null, {message: 'Purging chats...'});

        async.series([
            function (callback) {
                getCollection().remove({_key: nbbMessage}, callback);
            },
            function (callback) {
                getCollection().remove({_key: nbbMessageMeta}, callback);
            },
            function (callback) {
                getCollection().remove({_key: nbbChat}, callback);
            }
        ], function (error) {
            if (error) {
                console.error(error.message);
            }
            sockets.emit(constants.EVENT_CHATS_DID_PURGE);
        });
    };

    /**
     * @param payload will include field 'match' with string that should be compiled as RegExp
     * @param done
     */
    Controller.startSanitize = function (payload, done) {
        sanitize.sanitizeKeys(payload.match, done);
    };

    function getCollection() {
        return dbClient.collection('objects');
    }

})(module.exports);
