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
var jeditor = require("gulp-json-editor");

require('require-dir')('./gulp-tasks');

var fs = require('fs');
var GulpVars = JSON.parse(fs.readFileSync('./gulp-tasks/GulpVariables.json'))


gulp.task("default", gulp.series(gulp.parallel(['ChromeIconResize']), function () {
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

gulp.task('CheckExtensionVersion', function(){
    return gulp.src('./gulp-tasks/GulpVariables.json')
               .pipe(jeditor(function(json){console.log(json.ExtensionVersion)}));
});


gulp.task('SetExtensionVersion', function() {
    let version = "---";
    let argI = process.argv.indexOf("--args");
    if(argI>-1) {
        version = process.argv[argI+1];
    }

    return gulp.src('./gulp-tasks/GulpVariables.json')
               .pipe(jeditor(function(json) {
                    json.ExtensionVersion = version;
                    return json; // must return JSON object.
                }))
                .pipe(gulp.dest('./gulp-tasks/'));
});
