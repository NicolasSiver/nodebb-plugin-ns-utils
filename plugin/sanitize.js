(function (Sanitize) {
    'use strict';

    var async     = require('async'),

        constants = require('./constants'),
        nodebb    = require('./nodebb'),
        sockets   = require('./sockets');

    var dbClient = nodebb.db.client;

    var parsing = false,
        stats   = {
            progress: '0%',
            fieldsPurged: 0,
            docsParsed: 0,
            docsUpdated: 0
        };

    Sanitize.sanitizeKeys = function (match, done) {
        if (parsing) {
            return done(null);
        }
        parsing = true;
        emitStatus(parsing);
        emitStats(stats);

        var cursor = dbClient.collection('objects').find();

        async.parallel({
            count: function (callback) {
                cursor.count(callback);
            },
            regex: function (callback) {
                callback(null, new RegExp(match, 'g'))
            }
        }, function (error, result) {
            if (error) {
                return done(error);
            }

            var count = result.count;
            var regex = result.regex;

            done(null);
        });
    };

    function emitStatus(value) {
        sockets.emit(constants.EVENT_SANITIZE_STATUS_DID_CHANGE, {status: value});
    }

    function emitStats(data) {
        sockets.emit(constants.EVENT_SANITIZE_STATS_DID_CHANGE, {stats: data});
    }

})(module.exports);
