[![Build Status](https://travis-ci.org/webforbusinesses/forms.png?branch=master)](https://travis-ci.org/webforbusinesses/forms)

#How to build
1. npm install
2. bower update
3. build (run shlint on javascript files and test) -- grunt

run karma in watch mode -- karma start

With express browse:


#ToDo list
1. Add directives - dropdown, time, uploadFile
2. Add an express server that saves json objects into a local mongoDB
3. Load models from the DB to the clien and save models from the client
4. Add express simple login.

Done:
1. Added lint grunt target (run with 'grunt lint')
2. Added Simple express server that serve the form at http://localhost:3000/static/html/Form.html, to run it do npm install and node server/server.js
3. Added simple login form used with passport hardcoded local auth (in file auth.js) browse to  http://localhost:3000/static/html/login.html user name eran with every password.
