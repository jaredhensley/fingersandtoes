var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
var zip = require('gulp-zip');


// Handlebars plugins

var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

// Image Compression 

var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// File paths
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';

// Styles

// styles for vanilla css
/*gulp.task('styles', function () {
  console.log('starting styles task');
  return gulp.src(['public/css/reset.css', CSS_PATH])
    .pipe(plumber(function (err) {
      console.log('Styles Task Error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browswers: ['last 2 versions', 'ie 8']
    }))
    .pipe(concat('styles.css'))
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});*/

// styles for scss
gulp.task('styles', function () {
  return gulp.src('public/scss/styles.scss')
    .pipe(plumber(function (err) {
      console.log('Styles Task Error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browswers: ['last 2 versions', 'ie 8']
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src(SCRIPTS_PATH)
    .pipe(plumber(function(err) {
      console.log('Scripts task error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']  
    }))
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Images
gulp.task('images', function () {
  return gulp.src(IMAGES_PATH)
    .pipe(imagemin(
      [
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageminJpegRecompress()
      ]
    ))
    .pipe(gulp.dest(DIST_PATH + '/images'));
});

// Templates
gulp.task('templates', function () {
  return gulp.src(TEMPLATES_PATH)
    .pipe(handlebars({
      handlebars: handlebarsLib
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Clean
gulp.task('clean', function() {
  return del.sync([
    DIST_PATH
  ]);
});

// ZIP

gulp.task('export', function() {
  return gulp.src('public/**/*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'))
})

// Watch
gulp.task('watch', ['default'], function () {
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  /*gulp.watch(CSS_PATH, ['styles']);*/
  gulp.watch('public/scss/**/*.scss', ['styles']);
  gulp.watch(TEMPLATES_PATH, ['templates']);
});

// Default
gulp.task('default', ['clean', 'images', 'templates', 'styles', 'scripts', 'export'], function () {
  console.log('starting default task');
});