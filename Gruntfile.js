
/* jshint node: true */
module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      distPath:       'dist/'
    },

    banner: '/*!\n' +
            ' * =====================================================\n' +
            ' * Foxui v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %> (https://github.com/foxui/fox-json/blob/master/LICENSE)\n' +
            ' *\n' +
            ' * v<%= pkg.version %> designed by @fex-team.\n' +
            ' * =====================================================\n' +
            ' */\n',

    clean: {
      dist: ['<%= meta.distPath %>']
    },

    concat: {
      foxui: {
        options: {
          banner: '<%= banner %>'
        },
        src: [
          'src/*.js',
        ],
        dest: '<%= meta.distPath %><%= pkg.name %>.js'
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: '<%= meta.distPath %>'
      },
      tags: {
        expand: true,
        cwd: 'src/',
        src: '*.html',
        dest: '<%= meta.distPath %>'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        compress: true,
        mangle: true,
        preserveComments: false
      },
      foxui: {
        src: '<%= concat.foxui.dest %>',
        dest: '<%= meta.distPath %><%= pkg.name %>.min.js'
      }
    },

    watch: {
      scripts: {
        files: [
          'src/*.html'
        ],
        tasks: ['dist']
      }
    },

    qunit: {
      files: ['test/test.html']
    }
  });

  // Load the plugins
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Default task(s).
  grunt.registerTask('dist-js', ['concat', 'uglify']);
  grunt.registerTask('dist', ['clean', 'copy']);
  grunt.registerTask('build', ['dist']);
  grunt.registerTask('default', ['dist']);
  grunt.registerTask('test', ['dist', 'qunit']);

};
