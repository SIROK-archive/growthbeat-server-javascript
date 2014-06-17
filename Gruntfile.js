module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt, {
        config: 'package.json',
        scope: 'devDependencies'
    });

    grunt.initConfig({
        handlebars: {
            main: {
                options: {
                    namespace: "Growthbeat.templates",
                    processName: function (filename) {
                        return (/\/([a-zA-Z1-9-]+)\.html$/.exec(filename))[1];
                    }
                },
                files: {
                    "target/templates.js": ["templates/*.html"]
                }
            }
        },
        typescript: {
            main: {
                src: ['src/main.ts'],
                dest: 'target/main.js',
                options: {
                    module: 'amd',
                    comments: true
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'growthbeat.min.js': ['target/templates.js', 'target/main.js']
                }
            }
        },
        watch: {
            handlebars: {
                files: ['templates/*.html'],
                tasks: ['handlebars', 'uglify']
            },
            typescript: {
                files: ['src/*.ts'],
                tasks: ['typescript', 'uglify']
            }
        }
    });

    grunt.registerTask('default', ['handlebars', 'typescript', 'uglify']);
    grunt.registerTask('watchr',['watch']);

};

