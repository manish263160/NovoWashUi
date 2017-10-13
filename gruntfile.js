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
    
    clean: ['public/css/style.css', 'public/sass/build.scss' , 'public/app/composite.all.min.js'],

    uglify: { 
      my_target : { 
        options : { 
          mangle: false,
          ie8 : true,
          sourceMap : true, 
          sourceMapName : 'public/app/sourceMap.map'
        }, 
        // src : 'public/app/**/*.js', 
        // dest : 'public/app/composite.all.min.js'
        files : { 
          'public/app/composite.min.js':
          ['public/app/app.js'
            ,'public/app/NVConfig.js',
            'public/app/appRoutes.js',
            'public/app/components/homesection/homeSectionDirective.js'
            ,'public/app/partials/homeController.js',
            'public/app/components/aboutusSection/aboutusController.js',
            'public/app/components/servicesection/serviceSectionDirective.js'
            ,'public/app/angular/services/utilServices.js',
            'public/app/angular/services/apicallServices.js',
            'public/app/angular/services/rootAPIServices.js',
            'public/app/components/servicesection/servicesectionController.js',
            'public/app/components/partner/partnerController.js',
            'public/app/components/customerReview/customerReview.js',
            'public/app/components/ourPartners/partner.js',
            'public/app/allEnquery/enqueryUserListController.js',
            'public/app/angular/directives/slideToggle.js'] 
        },
        


      } 
    } 
    
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
    'uglify', 
    'cssmin',
    
  ]);
};