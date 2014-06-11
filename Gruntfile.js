module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt, {
        config: 'package.json',
        scope: 'devDependencies'
    });

    grunt.initConfig({
        typescript: {
            main: {
                src: ['hub-server.ts'],
                dest: 'hub-server.js',
                options: {
                    module: 'amd',
                    comments: true
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'hub-server.min.js': ['hub-server.js']
                }
            }
        },
        watch: {
            typescript: {
                files: ['*.ts'],
                tasks: ['typescript', 'uglify']
            }
        }
    });

    grunt.registerTask('default', ['typescript', 'uglify']);
    grunt.registerTask('watchr',['watch']);

};

