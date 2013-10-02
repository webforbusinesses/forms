path = require('path');

module.exports = {
    server: {
        listenPort: 3000,                                   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
        distFolder: path.resolve(__dirname, '../client'),  // The folder that contains the application files (note that the files are in a different repository) - relative to this file
        staticUrl: '/static',                               // The base url from which we serve static files (such as js, css and images)
        cookieSecret: 'angular-app-from'                  // The secret for encrypting the cookie
    }
};