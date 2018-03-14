var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    panini      = require('panini'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    reload      = browserSync.reload;

var sourceHtml  = 'src/**/*.html',
    sourceHbs   = 'src/**/*.hbs',
    buildHTML   = 'build',
    sourceJs    = 'src/js/_assets/**/*.js',
    buildJs     = 'build/js',
    sourceSass  = 'src/scss/_assets/**/*.scss',
    buildCss    = 'build/css';

gulp.task('pages', function() {
  gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(gulp.dest('build'));
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

gulp.task('reload', ['pages', 'sass', 'scripts'], function (done) {
    panini.refresh()
    browserSync.reload();
    done();
});


gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch([sourceHtml, sourceHbs, sourceSass, sourceJs], ['reload']);
});