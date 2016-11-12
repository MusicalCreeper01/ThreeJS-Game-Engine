var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');

gulp.task('default', function() {
  return gulp.src(['externs/*.js', 'ember.js', 'util/*.js'])
    .pipe(closureCompiler({
      compilerPath: 'bower_components/closure-compiler/closure-compiler-v20161024.jar',
      fileName: 'dist/ember.min.js',
      compilerFlags: {
        closure_entry_point: 'ember.js',
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        only_closure_dependencies: true,
        warning_level: 'VERBOSE'
      }
    }))
    .pipe(gulp.dest('dist'));
});
