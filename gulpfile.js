
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

    //Compile Sass, Autoprefix and minify
    gulp.task('styles', function() {
  return sass('styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'Styles task complete' }));
});

    //pug -crazyD
    gulp.task('pug', function buildHTML() {
      return gulp.src('*.pug')
      .pipe(pug())
      .pipe(gulp.dest('_site'))
      .pipe(livereload())
      .pipe(notify({ message: 'pug tast completed'}));
    });

    //JSHint, concat, and minify JavaScript
    gulp.task('scripts', function() {
  return gulp.src('scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

    //Compress Images
    gulp.task('images', function() {
      return gulp.src('images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('_site/assets/img'))
        .pipe(notify({ message: 'Images task complete' }));
    });

    //clean up
    gulp.task('clean', function() {
        return del(['_site/assets/css', '_site/assets/js', '_site/assets/img']);
    });

    // Default task
    gulp.task('default', ['clean'], function() {
      gulp.start('styles', 'pug', 'scripts', 'images', 'watch');
    });

    // Watch
    gulp.task('watch', function() {

      // Create LiveReload server
      livereload.listen();

      // Watch .scss files
      gulp.watch('styles/**/*.scss', ['styles']);

      // Watch .js files
      gulp.watch('scripts/**/*.js', ['scripts']);

      // Watch image files
      gulp.watch('images/**/*', ['images']);

      //watch pug files-crazyD
      gulp.watch('index.pug', ['pug']);

      // Watch any files in dist/, reload on change
      gulp.watch(['_site/**']).on('change', livereload.changed);

    });
