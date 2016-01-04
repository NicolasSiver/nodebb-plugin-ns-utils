(function (Sanitize) {
    'use strict';

    var async     = require('async'),

        constants = require('./constants'),
        nodebb    = require('./nodebb'),
        sockets   = require('./sockets');

    var dbClient = nodebb.db.client;

    var progressStep = 0.1,
        parsing      = false,
        stats        = null;

    Sanitize.emitProgress = function (stats, progress, step) {
        if (progress - stats.lastProgress >= step) {
            stats.lastProgress = progress;
            stats.progress = progress.toFixed(1) + '%';
            emitStats(stats);
        }
    };

    Sanitize.sanitizeKeys = function (match, done) {
        if (parsing) {
            return done(null);
        }
        parsing = true;
        stats = getInitialStats();

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
            var index = 0, documentsWritten = 0, fieldsDeleted = 0;
            var fieldsCache = NaN;

            cursor.each(function (error, document) {
                if (document != null) {
                    fieldsCache = fieldsDeleted;
                    ++index;

                    for (var key in document) {
                        if (regex.test(key)) {
                            delete document.key;
                            ++fieldsDeleted;
                        }
                    }

                    // There were field deletion
                    if (fieldsCache != fieldsDeleted) {
                        ++documentsWritten;
                    }

                    Sanitize.emitProgress(
                        setStats(stats, index, documentsWritten, fieldsDeleted),
                        100 * index / count, // one decimal
                        progressStep);
                    
                } else {
                    parsing = false;
                    emitStatus(parsing);
                    done(null);
                }
            });
        });
    };

    function getInitialStats() {
        return {
            progress    : '0.0%',
            lastProgress: 0,
            fieldsPurged: 0,
            docsParsed  : 0,
            docsUpdated : 0
        };
    }

    function emitStatus(value) {
        sockets.emit(constants.EVENT_SANITIZE_STATUS_DID_CHANGE, {status: value});
    }

    function emitStats(data) {
        sockets.emit(constants.EVENT_SANITIZE_STATS_DID_CHANGE, {stats: data});
    }

    function setStats(data, position, writes, keysDeleted) {
        data.docsParsed = position;
        data.docsUpdated = writes;
        data.fieldsPurged = keysDeleted;
        return data;
    }

})(module.exports);
