/**
 * Created by Nicolas on 10/13/15.
 */
(function (Controller) {
    'use strict';

    var async  = require('async'),

        nodebb = require('./nodebb');

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
            }
        }, done);
    };

    Controller.getPrimaryDatabase = function (done) {
        done(null, nconf.get('database'));
    };

})(module.exports);