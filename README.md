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

###Done

1. Add index.html and redirect from root to it.
2. do not let access to secure without login first.