/* eslint-env node */
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify");
const browserify = require("browserify");
const gutil = require("gulp-util");
const tap = require("gulp-tap");
const buffer = require("gulp-buffer");
const cssnano = require("gulp-cssnano");
const htmlmin = require("gulp-htmlmin");

const release = process.argv[3] === "--release";

gulp.task("js", () => {
  return gulp.src(["src/**/*.js", "!src/modules/*.js"], { read: false })
    .pipe(tap(function (file) {
      gutil.log("bundling " + file.path);
      file.contents = browserify(file.path, { debug: !release })
        .transform("babelify", { presets: ["env"] })
        .bundle();
    }))
    .pipe(buffer())
    .pipe(gulpif(release, uglify()))
    .pipe(gulp.dest("public"));
});

gulp.task("css", () => {
  return gulp.src("src/**/*.css")
    .pipe(autoprefixer({ browsers: [">1%"] }))
    .pipe(cssnano())
    .pipe(gulp.dest("public"));
});

gulp.task("html", () => {
  return gulp.src("src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public"));
});

gulp.task("build", ["js", "css", "html", "media"]);
gulp.task("default", ["build"]);

gulp.task("watch", ["build"], () => {
  gulp.watch("src/**/*.html", ["html"]);
  gulp.watch("src/**/*.css", ["css"]);
  gulp.watch("src/**/*.js", ["js"]);
});