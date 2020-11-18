"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var webp = require("gulp-webp");
var uglify = require('gulp-uglify-es').default;
var pipeline = require("readable-stream").pipeline;

var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("compress", function() {
  return pipeline(
    gulp.src("src/js/main.js"),
    uglify(),
    rename("main.min.js"),
    gulp.dest("build/js")
  );
});

// gulp.task("compressPicturefill", function() {
//   return pipeline(
//     gulp.src("src/js/picturefill.js"),
//     uglify(),
//     rename("picturefill.min.js"),
//     gulp.dest("build/js")
//   );
// });

gulp.task("copy", function() {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/js/**",
    "src/*.ico"
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/scss/**/*.scss", gulp.series("css"));
  gulp.watch("src/*.html", gulp.series("html", "refresh"));
  gulp.watch("src/js/*.js", gulp.series("compress"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "css", "compress", "html"));
gulp.task("start", gulp.series("build", "server"));
