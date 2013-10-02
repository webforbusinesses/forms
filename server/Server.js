var fs = require('fs');
var http = require('http');
var express = require('express');
require('express-namespace');
var passport = require('passport');
var config = require('./config.js');
require('./lib/auth.js');

var app = express();
var server = http.createServer(app);
require('./lib/routes/static').addRoutes(app, config);


app.use(express.logger());                                  // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
app.use(express.cookieParser(config.server.cookieSecret));  // Hash cookies with this secret
app.use(express.cookieSession());                           // Store the session in the (secret) cookie
app.use(passport.initialize());                             // Initialize PassportJS
app.use(passport.session());

app.post('/login',
    passport.authenticate('local', { successRedirect: '/static/html/Form.html'
    })
);
app.use(function(req, res, next) {
    if ( req.user ) {
        console.log('Current User:', req.user.firstName, req.user.lastName);
    } else {
        console.log('Unauthenticated');
    }
    next();
});


app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
server.listen(config.server.listenPort);
console.log('Server - listening on port: ' + config.server.listenPort);