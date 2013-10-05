var passport = require('passport');
var _ = require('underscore');
var acl = null;


function matchUser(username, password, users) {
    return _.find(users, function (user) {
        return user.name === username && user.password === password;
    });
}

// users: [ {name: "barak", groups: ["admin"], "password":"barak"} ]
function init(config) {
    acl = require('./acl.js').acl(config);
    var users = config.users;

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(
        function (username, password, done) {
            var user = matchUser(username, password, users);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect username. hint, try eran or barak' });
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done, err) {
        done(err, user);
    });
    return module.exports;
}

function currentUser(req, res) {
    res.json(200, req.user);
    res.end();
}

function login(req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) {
            next(err);
        } else if (!user) {
            res.json(user);
        } else {
            req.logIn(user, function (err) {
                if (err) {
                    next(err);
                } else {
                    res.json(user);
                }
            });
        }
    })(req, res, next);
}

function logout(req, res) {
    req.logout();
    res.send(204);
}


module.exports = {
    init: init,
    login: login,
    logout: logout,
    currentUser: currentUser,
    acl:function(){ return acl; }
};