var gulp = require('gulp'),
    clean = require('gulp-clean'),
    stylus = require('gulp-stylus'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    stylish = require('jshint-stylish'),
    streamqueue = require('streamqueue'),
    react = require('gulp-react');


var paths = {
  src: 'src/**',
  dest: 'target/',
  jsxScripts: 'target/**/*.jsx',
  jsScripts: 'target/**/*.js',
  stylus: 'target/**/*.styl',
};

gulp.task('clean', function() {
  return gulp.src(paths.dest, {read: false})
             .pipe(clean({force: true}));
});

gulp.task('copy', function() {
  return gulp.src(paths.src)
      .pipe(gulp.dest(paths.dest));
});

gulp.task('stylus', function () {
  gulp.src(paths.stylus)
    .pipe(stylus({errors: true}))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('scripts', function() {
  var stream = streamqueue({objectMode: true});

  // js scripts
  /*stream.queue(gulp.src(paths.jsScripts)
                  .pipe(jshint('./.jshintrc'))
                  .pipe(jshint.reporter(stylish)));*/

  // jsx scripts
  stream.queue(gulp.src(paths.jsxScripts)
                  .pipe(react())
                  .pipe(jshint('./.jshintrc'))
                  .pipe(jshint.reporter(stylish)));

  // copy to dest
  return stream.done()
              .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsxScripts, ['scripts']);
  gulp.watch(paths.jsScripts, ['scripts']);
  gulp.watch(paths.stylus, ['stylus']);
});


gulp.task('default', ['copy', 'stylus', 'scripts']);
gulp.task('dev', ['default', 'watch']);
