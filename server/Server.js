var fs = require('fs');
var http = require('http');
var express = require('express');
require('express-namespace');
var passport = require('passport');
var config = require('./config.js');
var security = require('./lib/security.js').init(config);

var app = express();
var server = http.createServer(app);

app.use(express.logger());                                  // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
app.use(express.cookieParser(config.server.cookieSecret));  // Hash cookies with this secret
app.use(express.cookieSession());                           // Store the session in the (secret) cookie
app.use(passport.initialize());                             // Initialize PassportJS
app.use(passport.session());

// copy the user name from passport to session.userId for acl.
app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        req.session.userId = req.session.passport.user.name;
    } else {
        req.session.userId = "";
    }
    next();
});

require('./lib/routes/security').addRoutes(app, security);
require('./lib/routes/static').addRoutes(app, config);

require('./lib/api/todo').todo(app, security.acl());

app.get("/", function (req, res) {
    res.redirect('/static/html/index.html');
});


// catch exceptions raised by acl and send 401
app.use(function (err, req, res, next) {
    if (err.errorCode === 401) {
        res.send(401, JSON.stringify(err));
    } else {
        next();
    }
});
// fall back to express error handler (show message on the console and send 500 to the client)
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

server.listen(config.server.listenPort);
console.log('Server - listening on port: ' + config.server.listenPort);