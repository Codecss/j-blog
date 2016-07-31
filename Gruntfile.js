/**
 * Created by jiangwei.john@foxmail on 2016/4/6.
 */
'use strict';
/*----------------------------------------------------
 * Module Setting
 *-----------------------------------------------------*/
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        // Task jsmin
        uglify: {
            options: {
                mangle: false,
                banner: '/*! Created by www.lightcolors.cn */'
            },
            build: {
                files: {
                    'public/js/lib/require.min.js': ['public/js/lib/require.js']
                }
            }
        },
        requirejs: {
            compile: {
                "options": {
                    "appDir": "src",
                    "baseUrl": "js",
                    "paths": {
                        "jquery": "lib/jquery.min",
                        "bootstrap": "lib/bootstrap.min",
                        "gAlert": 'app/galert',
                        "gAjax": 'app/gajax'
                    },
                    modules: [
                        {
                            name: "app/blog",
                            excludeShallow: [
                                "jquery"
                            ]
                        }
                    ],
                    dir: "public"
                }
            }
        }
    });

    // Load the plugin HTML/CSS/JS/IMG min
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    // Build task(s).
    grunt.registerTask('build', ['htmlmin', 'uglify', 'cssmin', 'imagemin']);
};