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
3. Load models from the DB to the client and save models from the client
4. Load both users and ACL from MongoDB.
###Done

1. Add index.html and redirect from root to it.
2. In server side use express passport to manage login and acl to manage permissions (configuration in server/config.js)
3. In client side Add HttpAuthInterceptor to trigger login form show when login is needed (try to add new value to the list when login as guest, or open it when you are not login);
5. ACL docs https://npmjs.org/package/acl
