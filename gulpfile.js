var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var open = require('gulp-open');
var typescript = require('gulp-typescript');
var sourceMaps = require('gulp-sourcemaps');
var sequence = require('gulp-sequence');
var clean = require('gulp-clean');
var dtsGenerator = require('dts-generator');

var project = typescript.createProject('tsconfig.json');

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('copy-lib', function () {
  return gulp.src('./lib/*.ts')
    .pipe(gulp.dest('./dist/lib/'));
});

gulp.task('copy-index', function () {
  return gulp.src('./index.ts')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compile', ['clean'], function () {
  return project.src()
    .pipe(sourceMaps.init({ loadMaps: true }))
    .pipe(typescript(project))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dts-gen', function() {
  dtsGenerator.default({
    name: 'strome.js',
    baseDir: ".",
    main: "strome.js/index",
    files: ["index.ts"],
    out: 'dist/index.d.ts',
    excludes: ["typings/**/*", "node_modules/**/*"]
  });
});

gulp.task('pre-test', function () {
  return gulp.src(['dist/lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('run-test', ['pre-test'], function () {
  return gulp.src(['dist/test/*.spec.js'])
    .pipe(mocha());
});

gulp.task('post-test', ['run-test'], function() {
  return gulp.src(['dist/test/*.js'])
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
gulp.task('test', sequence('pre-test', 'run-test', 'post-test'));
gulp.task('build', sequence('clean', ['compile', 'copy-lib', 'copy-index'], 'dts-gen'));