const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

const config = {
  src: './src/browser.js',
  outFilename: 'salesforce-id-validator.js',
  outDir: './dist/',
}

gulp.task('browserify', () => {
  return browserify({
    entries: config.src,
    debug: true,
  })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source(config.src))
    .pipe(buffer())
    .pipe(rename(config.outFilename))
    .pipe(gulp.dest(config.outDir))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js'}))
    .pipe(gulp.dest(config.outDir));
});

gulp.task('default', [
  'browserify',
]);