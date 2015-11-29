(function (Plugin) {
    'use strict';

    var async = require('async');

    var filters = require('./filters'),
        sockets = require('./sockets');

    //NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
    Plugin.hooks = {
        filters: filters,
        statics: {
            load: function (params, callback) {
                var router      = params.router,
                    middleware  = params.middleware,
                    controllers = params.controllers,
                    pluginUri   = '/admin/plugins/utils',
                    apiUri      = '/api' + pluginUri,
                    renderAdmin = function (req, res, next) {
                        res.render(
                            'admin/plugins/utils', {}
                        );
                    };

                router.get(pluginUri, middleware.admin.buildHeader, renderAdmin);
                router.get(apiUri, renderAdmin);

                async.series([
                    async.apply(sockets.init),
                ], callback);
            }
        }
    };
})(module.exports);
