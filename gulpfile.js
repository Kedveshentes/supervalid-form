var gulp = require('gulp');

var uglify = require('gulp-uglify');
var babel  = require('gulp-babel');
var del    = require('del');


gulp.task('watch', function () {
    gulp.watch('src/client/**/*.*', ['babel-client', 'copy-html', 'copy-css']);
    gulp.watch('src/server/**/*.*', ['babel-server']);
});


gulp.task('copy-html', function () {
    console.log('src/client/**/*.html MOVED');
    gulp.src('src/client/**/*.html')
        .pipe(gulp.dest('dist/client'));
});
gulp.task('copy-css', function () {
    console.log('src/client/**/*.css MOVED');
    gulp.src('src/client/**/*.css')
        .pipe(gulp.dest('dist/client'));
});


gulp.task('babel-client', function () {
    console.log('src/client/ BABELIZED');
    gulp.src('src/client/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});
gulp.task('babel-server', function () {
    console.log('src/server/ BABELIZED');
    gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});
gulp.task('babel', function () {
    gulp.start('babel-client', 'babel-server');
});


gulp.task('clean', function () {
    del(['dist']);
});


gulp.task('default', function () {
    gulp.start('babel', 'copy-html', 'copy-css');
});
