var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');

gulp.task('default', function() {
  return gulp.src(['src/externs/*.js', 'src/ember.js', , 'src/util/util.js', 'src/util/*.js'])
    .pipe(closureCompiler({
      compilerPath: 'bower_components/closure-compiler/closure-compiler-v20161024.jar',
      fileName: 'ember.min.js'
    }))
    .pipe(gulp.dest('dist'));
});
