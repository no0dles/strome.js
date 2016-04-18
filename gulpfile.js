var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var open = require('gulp-open');
var typescript = require('gulp-typescript');
var sourceMaps = require('gulp-sourcemaps');
var sequence = require('gulp-sequence');
var clean = require('gulp-clean');

var project = typescript.createProject('tsconfig.json');

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('compile', ['clean'], function () {
  return project.src()
    .pipe(sourceMaps.init({ loadMaps: true }))
    .pipe(typescript(project))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('pre-test', function () {
  return gulp.src(['dist/lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src(['dist/test/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports());
});

gulp.task('coverage', ['test'], function(){
  return gulp.src('./coverage/lcov-report/index.html')
    .pipe(open());
});

gulp.task('watch', ['compile'], function() {
  gulp.watch('lib/*.ts', 'examples/**/*.ts', ['compile']);
});

gulp.task('compile-test', sequence('compile', 'test'));