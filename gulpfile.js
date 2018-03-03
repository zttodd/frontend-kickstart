var gulp       = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat     = require('gulp-concat'),
    rename     = require('gulp-rename'),
    sass       = require('gulp-sass'),
    uglify     = require('gulp-uglify');

var sourceHTML  = 'src/templates/**/*.html',
    buildHTML   = 'build',
    sourceJs    = 'src/js/**/*.js',
    buildJs     = 'build/js',
    sourceSass  = 'src/scss/**/*.scss',
    buildCss    = 'build/css';

gulp.task('copy', function () {
    gulp.src(sourceHTML)
        .pipe(gulp.dest(buildHTML));
});

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

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "build"
    });

    gulp.watch([sourceHTML, sourceSass, sourceJs], ['copy', 'sass', 'scripts']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);