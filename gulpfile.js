var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var resizer = require('gulp-images-resizer');
var rename = require("gulp-rename");

require('require-dir')('./gulp-tasks');


let ChomeExtension = "./Chome extension/";

gulp.task("default", gulp.series(gulp.parallel(['imageResize']), function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ["src/main.ts"],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('contentscript.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(ChomeExtension));
}));