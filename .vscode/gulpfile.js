const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Define the input and output directories
const inputScssDir = '../src/scss/*.scss';
const outputCssDir = '../dist/css';
const inputHtmlDir = '../src/html/*.html';
const outputHtmlDir = '../dist/';

// Define a Gulp task to compile SCSS to CSS
gulp.task('sass', function() {
  return gulp.src(inputScssDir)
    .pipe(plumber(function(error) {
      console.error('Error:', error.message);
      this.emit('end');
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(outputCssDir))
    .on('end', function() {
      console.log('SCSS compilation completed successfully. Output files:', outputCssDir);
    });
});

// Defile a Gulp task to copy html files to dist dir
gulp.task('htmlcopier', function() {
  return gulp.src(inputHtmlDir)
    .pipe(gulp.dest(outputHtmlDir))
    .on('end', function() {
      console.log('Html files copied to: ', outputHtmlDir);
    });
});

// Define a Gulp task to watch SCSS files for changes
gulp.task('watch', function() {
  gulp.watch(inputScssDir, gulp.series('sass'));
  gulp.watch(inputHtmlDir, gulp.series('htmlcopier'));
});

// Default task - runs 'sass' & 'htmlcopier' task first and then starts watching for changes
gulp.task('default', gulp.series('sass', 'htmlcopier', 'watch'));
