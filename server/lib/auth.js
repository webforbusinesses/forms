var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        if (username === 'barak' || username === 'eran') {
            return done(null, {'name': username});
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