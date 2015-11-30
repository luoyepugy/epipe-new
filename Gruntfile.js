
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/coffee/',
                    src: ['**/*.coffee'],
                    dest: 'dist/js/',
                    ext: '.js'
                }]
            }
        },
        uglify: {
            options: {  
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'  
            },
            build: {
                options: {
                    report: "min"//输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['**/*.js'],
                    dest: 'dist/js/',
                    ext: '.js'
                }]
            }     
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: { 
                    'dist/css/common-new.min.css': 'src/sass/common-new.sass'
                }
            },
            pages: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'src/sass/pages/',
                    src: '**/*.sass',
                    dest: 'dist/css/pages/',
                    ext: '.min.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9'],
                map: false
            },
            sass: {
                src: 'dist/css/**/*.min.css'
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5 
                },
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },
        watch: {
	        options: { 
                livereload: true,
                spawn: false    
	        },
            css: {
                files: ['**/*.sass'],
                tasks: ['sass','autoprefixer']
            },
            js: {
                files: 'src/**/*.js',
                tasks: ['uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('img', ['imagemin']);
    grunt.registerTask('minjs', ['uglify']);
}

