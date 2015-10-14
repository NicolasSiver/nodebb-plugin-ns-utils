/**
 * Created by Nicolas on 10/13/15.
 */
(function (Controller) {
    'use strict';

    var nodebb = require('./nodebb');

    var nconf = nodebb.nconf;

    // Messages, documents:
    // message - 'message:5' [Hash]
    // message meta - 'messages:uid:1001:to:239', includes only message id and time [Sorted]
    // chat - 'uid:1:chats', includes uid of companion and time [Sorted]

    Controller.getChatsStats = function (done) {
        done(null, {stats: 100});
    };

    Controller.getPrimaryDatabase = function (done) {
        done(null, nconf.get('database'));
    };

})(module.exports);