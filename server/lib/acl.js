var acl = require('acl');

module.exports.acl = function (config) {
    acl = new acl(new acl.memoryBackend(), {debug: function(){console.info("acl", arguments);}});
    config.users.forEach(function (user) {
        acl.addUserRoles(user.name, user.groups, function(){});
    });
    config.access.forEach(function (access) {
        acl.allow(access.group, access.resources, access.permissions, function(){});
    });
    return acl;
};