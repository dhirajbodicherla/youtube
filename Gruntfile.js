module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    react: {
      single_file_output: {
        files: {
          'js/application.js': 'js/application.jsx'
        }
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

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('start-server', ['shell:target']);
  grunt.registerTask('default', ['concat', 'uglify', 'sprite', 'less', 'processhtml']);
  grunt.registerTask('dev', ['processhtml:dev']);
  grunt.registerTask('dist', ['react', 'concat', 'uglify', 'sprite', 'less:dist', 'processhtml:dist']);

};