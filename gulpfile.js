var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');

var paths = [
    'src/externs/*.js',
    'src/ember.js',
    'src/core/*.js',
    'src/util/util.js', // Includes the Ember.Util object - want to include before other utils
    'src/util/*.js'
]

gulp.task('default', function() {
  return gulp.src(paths)
    .pipe(closureCompiler({
      compilerPath: 'bower_components/closure-compiler/closure-compiler-v20161024.jar',
      fileName: 'ember.min.js'
    }))
    .pipe(gulp.dest('dist'));
});
