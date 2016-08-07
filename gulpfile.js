var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var cssnano = require('gulp-cssnano');

gulp.task('css', function () {
    gulp.src('src/common/*.scss')
    .pipe(compass({
        css: 'build/',
        sass: 'src/common'
    }));
    gulp.src('src/page/**/*.scss')
    .pipe(compass({
    	css: 'build/',
    	sass: 'src/page'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('build'));
});

gulp.task('css-watch', function () {
    return gulp.watch('src/**/*.scss', ['css']);
});