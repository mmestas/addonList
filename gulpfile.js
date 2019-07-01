// 'use strict';
//
// const gulp = require('gulp');
// const gulpif  = require('gulp-if');
// const htmlmin = require('gulp-htmlmin');
// const uglify  = require('gulp-uglify');
// const uuidv1 = require('uuid/v1');
// const csso    = require('gulp-csso');
// const concat = require('gulp-concat');
// const del     = require('del');
// const replace = require('gulp-replace');
//
// const ALL_FOR_ONE_FILE_HASH =  uuidv1();
//
// /**
//  * Tasks:
//  *  - Clean
//  */
// gulp.task('clean', del.bind(null, ['gulp_build']));
//
// /**
//  * Tasks:
//  *  - Uglify JS
//  *  - Minify CSS and HTML
//  */
// gulp.task('pack', function () {
//
//   return gulp.src([
//     'docs/*',
//     'docs/**/*'
//   ])
//   // Scripts
//   .pipe(gulpif('*.js', uglify()))
//   // Styles
//   .pipe(gulpif('*.css', csso()))
//   // HMTL
//   .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
//   // DEST
//   .pipe(gulp.dest('gulp_build'));
//
// });
//
// /**
//  * Tasks:
//  *  - Build an single JS FILE
//  */
// gulp.task('packJS', function () {
//   return gulp.src([
//     'gulp_build/main.*.js',
//     'gulp_build/polyfills.*.js',
//     'gulp_build/runtime.*.js',
//     'gulp_build/scripts.*.js',
//   ])
//   .pipe(concat('all.' + ALL_FOR_ONE_FILE_HASH + '.js'))
//   .pipe(gulp.dest('gulp_build'));
// });
//
// /**
//  * Tasks:
//  *  - Update index.html with the "single JS FILE name"
//  */
// gulp.task('allForOneMain', function(){
//   return gulp.src([
//       'gulp_build/index.html',
//     ])
//     .pipe(replace(/main.+?js/g, 'all.' + ALL_FOR_ONE_FILE_HASH + '.js'))
//     .pipe(replace(/polyfills.+?js/g, ''))
//     .pipe(replace(/scripts.+?js/g, ''))
//     .pipe(replace(/runtime.+?js/g, ''))
//     .pipe(gulp.dest('gulp_build'));
// });
//
// gulp.task('singleJSFILE', gulp.series('packJS', 'allForOneMain'));
//
// gulp.task('default', gulp.series('clean', 'pack', 'singleJSFILE'));
