module.exports = function(grunt){
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
  	sass: {
  		dist: {
  			files: [{
  				expand: true,
  				cwd: 'css',
  				src: ['*.scss'],
  				dest: 'css',
  				ext: '.css'
  			}]
  		}
  	},
    watch: {
      files: ['css/*.scss'],
      tasks: ['css']
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'css/*.css',
            '*.html',
            'js/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './' 
          }
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: './',
          src: 'images/*.{png,gif,jpg,jpeg}',
          dest: 'dist/'
        }]
      }
    },    

   copy: {
      html: {
        files: [{
          expand: true,
          dot: true,
          cwd: './',
          src: ['*.html'],
          dest: 'dist'
        }]
      },

      font: {
        files: [
        {
          expand: true,
          dot: true,
          cwd: 'node_modules/open-iconic/font',
          src: ['fonts/*.*'],
          dest: 'dist'
        }]
      }
    },
    
  
    clean: {
      build: {
        src: ['dist/']
      }
    },

    concat: {
     options: {
        separator: ';'
      },
      dist: {}
    },
   
    uglify: {
      dist: {}
    },

    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },

      release: {
        files: [{
          src: [
            'dist/js/*.js',
            'dist/css/*.css',
          ]
        }]
      }
    },
   
    useminPrepare: {
      foo: {
        dest: 'dist',
        src: ['index.html','about.html','contacto.html','precios.html']
      },
      options: {
        flow: {
          steps: {
            css: ['cssmin'],
            js: ['uglify']
          },
          post: {
            css: [{
              name: 'cssmin',
              createConfig: function(context, block){
                var generated = context.options.generated;
                generated.options = {
                  keepSpecialComments: 0,
                  rebase: false
                }
              }
            }]
          }
        }
      }
    },
    cssmin: {
      dist: {}
    },

    usemin: {
      html: ['dist/index.html', 'dist/about.html', 'dist/precios.html', 'dist/contacto.html'],
      options: {
        assetsDir: ['dist','dist/css', 'dist/js']
      }
    }

  });
  
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('img:compress', ['imagemin']);
  grunt.registerTask('build', [
   'clean',
   'copy',    
   'concat',
   'imagemin',  
   'uglify',
   'filerev',
   'useminPrepare',
   'cssmin',   
   'usemin'
  ]);
 /* grunt.registerTask('default', ['build']);*/
};