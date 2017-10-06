const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const rigger = require('gulp-rigger');
const stylus = require('gulp-stylus');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const webpack = require('gulp-webpack');
const through = require('through2');
// const webpackConfig = require('./webpack.config.js');

const path = {
  in: './templates',
  out: './dist'
};

function buildHMTL() {
  return gulp.src(`${path.in}/**/*.html`)
    .pipe(rigger())
    .pipe(gulp.dest(path.out))
    .pipe(browserSync.stream());
}

function buildCSS() {
  return gulp.src(`${path.in}/**/*.styl`)
    .pipe(stylus({ compress: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.out))
    .pipe(browserSync.stream());
}

function buildJS() {
  var fileName;
  return gulp.src(`${path.in}/**/*.js`)
    .pipe(through.obj(function (chunk, enc, cb) {
      let fPath = chunk.path;
      let extPos = fPath.lastIndexOf('.');
      fileName = fPath.slice(fPath.lastIndexOf('\\') + 1, extPos);
      console.log(fileName);
      cb(null, chunk)
    }))
    .pipe(webpack({
      output: {
        fileName: '[name].bundle.js'
      }
    }))
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(uglify())
    .pipe(gulp.dest(path.out))
    .pipe(browserSync.stream());
}

gulp.task('build:html', buildHMTL);

gulp.task('build:css', buildCSS);

gulp.task('build:js', buildJS);

gulp.task('serve', ['build:html', 'build:css', 'build:js'], () => {
  browserSync.init({ server: path.out });
  watch(`${path.in}/**/*.html`, buildHMTL);
  watch(`${path.in}/**/*.styl`, buildCSS);
  watch(`${path.in}/**/*.js`, buildJS);
});

gulp.task('default', ['serve']);
