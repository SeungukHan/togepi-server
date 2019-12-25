const sass = require('node-sass');

module.exports = grunt => {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: false
            },
            core: {
                src: 'reveal/css/reveal.scss',
                dest: 'reveal/css/reveal.css'
            },
            themes: {
                expand: true,
                cwd: 'reveal/css/theme/source',
                src: ['*.sass', '*.scss'],
                dest: '/reveal/css/theme',
                ext: '.css'
            }
        },
        autoprefixer: {
            core: {
                src: 'css/reveal.css'
            }
        },
        cssmin: {
            options: {
                compatibility: 'ie9'
            },
            compress: {
                src: 'reveal/css/reveal.css',
                dest: 'reveal/css/reveal.min.css'
            }
        },
        uglify: {
            options: {
                ie8: true
            },
            build: {
                src: 'reveal/js/reveal.js',
                dest: 'reveal/js/reveal.min.js'
            }
        },

        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                esnext: true,
                latedef: 'nofunc',
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                expr: true,
                loopfunc: true,
                globals: {
                    head: false,
                    module: false,
                    console: false,
                    unescape: false,
                    define: false,
                    exports: false,
                    require: false
                }
            },
            files: [ 'gruntfile.js', 'reveal/js/reveal.js' ]
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        watch: {
            js: {
                files: [ 'gruntfile.js', 'reveal/js/reveal.js' ],
                tasks: 'js'
            },
            theme: {
                files: [
                    'reveal/css/theme/**/*.scss',
                    'reveal/css/theme/**/*.sass'
                ],
                tasks: 'css-themes'
            },
            css: {
                files: [ 'css/reveal.scss' ],
                tasks: 'css-core'
            },
            html: {
                files: ['reveal/material/**/*.html']
            },
            markdown: {
                files: ['reveal/material/**/*.md']
            },
            options: {
                livereload: true
            }
        },
        concurrent: {
            public: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['nodemon', 'watch']
            }
        }
    });

    grunt.registerTask( 'default', [ 'css', 'js' ] );
    grunt.registerTask( 'js', [ 'jshint', 'uglify' ] );
    grunt.registerTask( 'css', [ 'sass', 'autoprefixer', 'cssmin' ] );
    grunt.registerTask( 'css-core', [ 'sass:core', 'autoprefixer', 'cssmin' ] );
    grunt.registerTask( 'css-themes', [ 'sass:themes' ] );
    grunt.registerTask( 'serve', [ 'concurrent' ] );
};
