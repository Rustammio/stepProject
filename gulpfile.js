const gulp = require("gulp");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const browserSync = require("browser-sync");
const gulpClean = require("gulp-clean");

const cleanDist = () => {
  return gulp.src("dist/*").pipe(gulpClean({ force: true }));
};
gulp.task("cleanDist", cleanDist);

const moveCss = () => {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("styles.min.css"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css/"))
    .pipe(browserSync.stream());
};
gulp.task("moveCss", moveCss);

const moveJs = () => {
  return gulp
    .src("src/js/*.js")
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js/"))
    .pipe(browserSync.stream());
};
gulp.task("moveJs", moveJs);

const moveImg = () => {
  return gulp
    .src("src/img/**/*")
    .pipe(
      cache(
        imagemin({
          optimizationLevel: 5,
          progressive: true,
          interlaced: true,
        })
      )
    )
    .pipe(gulp.dest("dist/img/"))
    .pipe(browserSync.stream());
};
const cleanImg = () => {
  return gulp.src("dist/img/*").pipe(gulpClean({ force: true }));
};
gulp.task("cleanImg", cleanImg);
gulp.task("moveImg", moveImg);

const watch = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("src/img/", { events: "all" }, gulp.series(cleanImg, moveImg));
  gulp.watch("src/js/*.js", moveJs);
  gulp.watch("src/scss/**/*.scss", moveCss);
};
gulp.task("watch", watch);

gulp.task(
  "build",
  gulp.series("cleanDist", gulp.parallel("moveImg", "moveJs", "moveCss"))
);

gulp.task("dev", gulp.series("build", "watch"));
