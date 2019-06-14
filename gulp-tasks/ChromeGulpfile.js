var gulp = require("gulp");
var resizer = require('gulp-images-resizer');
var rename = require("gulp-rename");
var jeditor = require("gulp-json-editor");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var fs = require('fs');
var GulpVars = JSON.parse(fs.readFileSync('./gulp-tasks/GulpVariables.json'))


var ResizeImageTasks = [];
[128,48,16].forEach(function(size) {
    var resizeImageTask = 'resize_' + size;
    gulp.task(resizeImageTask, function() {
      return gulp.src('src/images/*.*')
      .pipe(resizer({format: "png", width: size }))
      .pipe(rename('Icon' + size + '.png'))
      .pipe(gulp.dest(GulpVars.ChromeDist + 'images/'));
    });
    ResizeImageTasks.push(resizeImageTask);
});

gulp.task('ChromeIconResize', gulp.series(ResizeImageTasks));

gulp.task("ChromeManifst", function () {
  return gulp.src(GulpVars.ChromeSrc+ "manifest.json")
             .pipe(jeditor(function(json) {
              json.version = GulpVars.ExtensionVersion;
              return json; // must return JSON object.
              }))
             .pipe(gulp.dest(GulpVars.ChromeDist));
}); 

gulp.task('ChromeBuildJs', gulp.series( 
  function () { return gulp.src('./src/*.ts').pipe(gulp.dest('./src/BuildTemp/'))},
  function () { return gulp.src('./src/Chome/*.ts').pipe(gulp.dest('./src/BuildTemp/'))},
  function () { return browserify({
                  basedir: '.',
                  debug: true,
                  entries: ["src/BuildTemp/Main.ts"],
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
              .pipe(gulp.dest(GulpVars.ChromeDist))}
));


gulp.task('ChromeFull', gulp.series(
  gulp.parallel('ChromeIconResize','ChromeManifst','ChromeBuildJs')
  //Package
  ));
