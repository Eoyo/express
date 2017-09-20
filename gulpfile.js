var gulp = require('gulp');
var liveReload = require("gulp-livereload");
var path = require("path")
var gulpSass = require('gulp-sass');
var sass = require("node-sass");

var sassFunc = {
  "nth($arr,$value)"(){
    console.log($value.getValue());
    return new sass.types.Number(0);
  }
}

gulp.task('sass-for-scss', function () {
  return gulp.src('public/sass/**/*.scss')
    .pipe(gulpSass.sync().on('error', gulpSass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(liveReload());
});
gulp.task('sass-for-sass', function () {
  return gulp.src('public/sass/**/*.sass')
    .pipe(gulpSass.sync().on('error', gulpSass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(liveReload());
});

function errorLog(error) {
  console.error.bind(error);
  this.emit("end");
}

gulp.task("jsWatch", function () {
  gulp.src("public/mygulp/hivjs/*.js")
    .pipe(liveReload());
})
gulp.task('watch', function () {
  liveReload.listen();
  // gulp.watch("public/mygulp/hivjs/*.js", ['jsWatch']);
  gulp.watch("public/sass/**/*.sass", ["sass-for-sass"]);
  gulp.watch("public/sass/**/*.scss", ["sass-for-scss"]);
});
gulp.task('default', ["sass-for-sass", "sass-for-scss", "watch"]);