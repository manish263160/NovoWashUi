// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
       scss: {
         src: ['public/sass/*.scss',],
         dest: 'public/sass/build.scss',
       },
      //  js:{
      //   src: ['public/app/**/*.js',],
      //   dest: 'public/js/main.js',
      //  }
     },
/*   -----------uglyfy the css and js---- */
    /* uglify: {
      js: {
        src: 'public/js/main.js',
        dest: 'public/js/main.min.js'
      }
    }, */
    cssmin: {
      css: {
        src: 'public/css/style.css',
        dest: 'public/css/style.min.css'
      }
    },

    // Tasks
    sass: { // Begin Sass Plugin
      dist: {
        files: {
            'public/css/style.css': 'public/sass/build.scss'
         }
       }
    },
    
    clean: ['public/css/style.css', 'public/sass/build.scss'],

   // Compile everything into one task with Watch Plugin
    // watch: { 
    //   clean: ['public/css/style.css', 'public/sass/build.scss'],
    //   css: {
    //     files: 'public/sass/**/*.{scss,sass}',
    //     tasks: ['concat','sass']
    //   },
    // },
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register Grunt tasks
  grunt.registerTask('default', [
              'clean',
              'watch',
        ]);
  
  grunt.registerTask('build', [
    'clean',
    'concat',
    'sass',
    // 'uglify', 
    'cssmin',
    
  ]);
};