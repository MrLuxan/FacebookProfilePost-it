var gulp = require("gulp");
var resizer = require('gulp-images-resizer');
var rename = require("gulp-rename");

var resizeImageTasks = [];

[128,48,16].forEach(function(size) {
    var resizeImageTask = 'resize_' + size;
    gulp.task(resizeImageTask, function() {
      return gulp.src('src/images/*.*')
      .pipe(resizer({format: "png", width: size }))
      .pipe(rename('Icon' + size + '.png'))
      .pipe(gulp.dest(ChomeExtension + 'images/'));
    });
    resizeImageTasks.push(resizeImageTask);
});

gulp.task('imageResize', gulp.series(resizeImageTasks));