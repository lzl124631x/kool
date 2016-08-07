var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');

gulp.task('c', function () {
    gulp.src('src/common/*.scss')
    .pipe(sass());
});