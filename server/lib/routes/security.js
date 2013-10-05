exports.addRoutes = function(app, security) {
    app.post('/login', security.login);
    app.post('/logout', security.logout);
    app.get('/current-user', security.currentUser);
};