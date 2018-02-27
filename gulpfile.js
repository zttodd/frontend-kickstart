var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    rename     = require('gulp-rename'),
    sass       = require('gulp-sass'),
    uglify     = require('gulp-uglify');

var sourceJs    = 'src/js/**/*.js',
    buildJs     = 'build/js',
    sourceSass  = 'src/scss/**/*.scss',
    buildCss    = 'build/css';

gulp.task('sass', function () {
    return gulp.src(sourceSass)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(buildCss));
});

gulp.task('scripts', function() {
    return gulp.src(sourceJs)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(buildJs))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildJs));
});

gulp.task('watch', function () {
    gulp.watch([sourceSass, sourceJs], ['sass', 'scripts']);
});

gulp.task('default', ['watch']);