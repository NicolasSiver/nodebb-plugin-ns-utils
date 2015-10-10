(function (Filters) {
    'use strict';

    Filters.adminHeaderBuild = function (header, callback) {
        header.plugins.push({
            route: '/plugins/utils',
            icon : 'fa-bug',
            name : 'Utils'
        });
        callback(null, header);
    };

})(module.exports);
