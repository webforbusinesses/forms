module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'client/src/**/*.js', 'client/test/**/*.js'],
            options:{
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                boss:true,
                eqnull:true,
                globals:{}
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            },
            chrome: {
                browsers: ['Chrome']
            },
            all: {
                browsers: ['Chrome', "FireFox"]
            },
            dev: {
                reporters: 'dots'
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'karma:chrome']);

};