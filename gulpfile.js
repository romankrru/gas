const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const imageMin = require('gulp-imagemin');
const rename = require('gulp-rename');
const rigger = require('gulp-rigger');
const stylus = require('gulp-stylus');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const webpack = require('gulp-webpack');

const path = {
  html: {
    src: './templates/*.html',
    dist: './public',
    watch: './templates/**/*.html'
  },
  style: {
    src: './media/style/*.styl',
    dist: './public/css',
    watch: ['./common.blocks/**/*.styl', './media/style/*.styl']
  },
  image: {
    src: ['./media/image/**/*.jpg', './media/image/**/*.png'],
    dist: './public/img'
  }
};

function buildHMTL() {
  return gulp.src(path.html.src)
    .pipe(rigger())
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest(path.html.dist))
    .pipe(browserSync.stream());
}

function buildCSS() {
  return gulp.src(path.style.src)
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(rename({
      dirname: '',
      suffix: '.min',
    }))
    .pipe(gulp.dest(path.style.dist))
    .pipe(browserSync.stream());
}

function optimizeImages() {
  return gulp.src(path.image.src)
    .pipe(imageMin())
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest(path.image.dist));
}

gulp.task('build:html', buildHMTL);
gulp.task('build:css', buildCSS);
gulp.task('build:img', optimizeImages);

gulp.task('serve', ['build:html', 'build:css'], () => {
  browserSync.init({ server: path.html.dist });
  watch(path.html.watch, buildHMTL);
  watch(path.style.watch, buildCSS);
});

gulp.task('default', ['build:img', 'serve']);
