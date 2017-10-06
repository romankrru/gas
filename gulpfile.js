const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const rigger = require('gulp-rigger');
const stylus = require('gulp-stylus');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');

const path = {
  in: './templates',
  out: './dist'
};

gulp.task('build:html', () => {});
gulp.task('build:css', () => {
  return gulp.src(`${path.in}/**/*.styl`)
    .pipe(stylus({ compress: true }))
    .pipe(gulp.dest(`${path.out}/css`))
});
gulp.task('build:js', () => {});
gulp.task('serve', ['build:html', 'build:css', 'build:js'], () => {
  watch(`${path}/html`, () => {
    
  });
});
gulp.task('default', ['serve']);
