module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      react: {
        files: 'scripts/*.jsx',
        tasks: ['browserify'],
        options: {
          livereload: true
        }
      }
    },

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      client: {
        src: ['scripts/**/*.jsx'],
        dest: 'dist/app.build.js'
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/libs/jquery-latest.min/index.js',
             'js/libs/react/react.js',
             'js/application.js'],
        dest: 'dist/js/build.js',
      },
    },

    uglify: {
      build: {
        src: 'dist/js/build.js',
        dest: 'dist/js/build.min.js'
      }
    },

    shell: {
      options: {
          stderr: false
      },
      target: {
          command: 'php -S localhost:8989'
      }
    },

  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('start-server', ['shell:target']);
  grunt.registerTask('default', ['concat', 'uglify', 'sprite', 'less', 'processhtml']);
  grunt.registerTask('dev', ['processhtml:dev']);
  grunt.registerTask('dist', ['concat', 'uglify', 'sprite', 'less:dist', 'processhtml:dist']);

};