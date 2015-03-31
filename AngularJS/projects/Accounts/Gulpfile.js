var gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    stylus      = require('gulp-stylus'),
    stream      = require('gulp-streamify'),
    nib         = require('nib'),
    jshint      = require('gulp-jshint'),
    rename      = require('gulp-rename'),
    concat      = require('gulp-concat'),
    stylish     = require('jshint-stylish'),
    preprocess  = require('gulp-preprocess'),
    minifyCSS   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify')
    seq         = require('run-sequence'),
    plug        = require('gulp-load-plugins')(),
    gutil       = require('gulp-util'),
    Notifier    = new require('node-notifier')();

var bases = {
 root: '.',
 src: 'src/',
 target: 'dist/',
 jsTarget: 'dist/js/',
 cssTarget: 'dist/css/'
};

var paths = {
  all: "**",
  js: 'js/app/**/*.js',
  appJS: 'js/app/app.js',
  vendorJS: 'js/vendor/*.js',
  styl: "stylus/**/*.styl",
  rootStyl: 'index.styl',
  destStyl: 'index.css',
  rootHtml: 'src/index.html',
  htmlTemplates: 'src/js/app/**/*.html'
};

var isDevEnvironment = false;

gulp.task('setDevEnv', function() {
    isDevEnvironment = true;
    console.log("set to dev environment");
});

gulp.task('clean-target', function() {
  return gulp.src(bases.target, {read: false})
             .pipe(clean({force: true}));
});

gulp.task('copy', function() {
  return gulp.src(paths.all, {cwd: bases.src/*, dot: true*/})
             .pipe(gulp.dest(bases.target));
});

gulp.task('stylus', ['copy'], function () {
  return gulp.src(paths.rootStyl, {cwd: bases.target})
            .pipe(stylus({errors: true, /*linenos: true,*/ use: [nib()]}))
            .pipe(isDevEnvironment ? gutil.noop() : minifyCSS({keepBreaks:true}))
            .pipe(rename(paths.destStyl))
            .pipe(gulp.dest(bases.cssTarget));
});

gulp.task('templatecache', ['copy'], function() {
    return gulp
        .src(paths.htmlTemplates, {cwd: bases.appTarget})
        // .pipe(plug.bytediff.start())
        .pipe(plug.minifyHtml({
            empty: true
        }))
        // .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'app.templates',
            standalone: true,
            root: 'js/app/'
        }))
        .pipe(gulp.dest(bases.jsTarget));
});

gulp.task('jshint', ['copy'], function() {
    return gulp
        .src(paths.js, {cwd: bases.target})
        .pipe(plug.jshint("./.jshintrc"))
        .pipe(plug.jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['copy', 'jshint'], function() {

    var source = [].concat(paths.appJS, paths.js);
    return gulp
        .src(source, {cwd: bases.target})
        // .pipe(plug.sourcemaps.init()) // get screwed up in the file rev process
        .pipe(plug.concat('accounts.js'))
        .pipe(isDevEnvironment ? gutil.noop() : stream(uglify()))
        .pipe(gulp.dest(bases.jsTarget));
});

gulp.task('vendorjs', ['copy', 'jshint'], function() {
    return gulp
        .src(['js/vendor/angular.js',
             'js/vendor/lodash.js',
             'js/vendor/jquery.js',
             'js/vendor/angular-router.js',
             'js/vendor/plugins/**/*.js',
             'js/vendor/directives/**/*.js'], {cwd: bases.target})
        .pipe(isDevEnvironment ? gutil.noop() : stream(uglify()))
        .pipe(plug.concat('vendor.js'))
        .pipe(gulp.dest(bases.jsTarget));
});

gulp.task('cleanup', ['js', 'vendorjs', 'templatecache'], function() {
  return gulp.src(["dist/js/app/",
                   "dist/js/vendor/",
                   "dist/stylus/",
                   "dist/index.styl"], {read: false})
             .pipe(clean({force: true}));
});

gulp.task('notify', ['cleanup'], function() {
  Notifier.notify({
        title: 'Build Completed',
        message: 'Refresh your app...'
    });
});

gulp.task('build', ['copy', 'stylus', 'templatecache', 'js', 'vendorjs', 'cleanup', /*,  'post-build-cleanup', 'post-process-files'*/ 'notify']);

gulp.task('default', function () {
  seq('clean-target', ['build']);
});

// dev task - enables watchers and autoreload
gulp.task('dev', function () {
  seq('setDevEnv', 'clean-target', ['build', /*'watch'*/]);
});


