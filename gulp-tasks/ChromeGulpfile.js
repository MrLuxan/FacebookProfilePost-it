var gulp = require("gulp");
var resizer = require('gulp-images-resizer');
var rename = require("gulp-rename");
var jeditor = require("gulp-json-editor");

var GulpVars = require('./GulpVariables');

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


gulp.task("ChromeManifst", function () {
  return gulp.src(GulpVars.ChromeSrc+ "manifest.json")
             .pipe(jeditor(function(json) {
              json.version = GulpVars.ExtensionVersion;
              return json; // must return JSON object.
              }))
             .pipe(gulp.dest(GulpVars.ChromeDist));
}); 

gulp.task('ChromeIconResize', gulp.series(ResizeImageTasks));