var gulp = require("gulp");
var resizer = require('gulp-images-resizer');
var rename = require("gulp-rename");
var jeditor = require("gulp-json-editor");


var fs = require('fs');
var GulpVars = JSON.parse(fs.readFileSync('./gulp-tasks/GulpVariables.json'))


var FireFoxResizeImageTasks = [];
[512,128].forEach(function(size) {
    var resizeImageTask = 'resize_' + size;
    gulp.task(resizeImageTask, function() {
      return gulp.src('src/images/*.*')
      .pipe(resizer({format: "png", width: size }))
      .pipe(rename('Icon' + size + '.png'))
      .pipe(gulp.dest(GulpVars.FirefoxDist + 'images/'));
    });
    FireFoxResizeImageTasks.push(resizeImageTask);
});


gulp.task("FirefoxManifst", function () {
  return gulp.src(GulpVars.FirefoxSrc + "manifest.json")
             .pipe(jeditor(function(json) {
              json.version = GulpVars.ExtensionVersion;
              return json; // must return JSON object.
              }))
             .pipe(gulp.dest(GulpVars.FirefoxDist));
}); 

gulp.task('FirefoxIconResize', gulp.series(FireFoxResizeImageTasks));