const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp')
const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const changed = require("gulp-changed");
const sass = require("gulp-sass")(require("sass"));
const fileinclude = require("gulp-file-include");
const browsersync = require("browser-sync").create();
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const uglify = require("gulp-uglifyjs");
const gulpClean = require('gulp-clean');


function clear() {
    return src('./build/*', {
        read: false
    })
    .pipe(clean())
}
// scss
function scss() {
    const source = "./src/scss/*.scss";

    return src(source)
      .pipe(changed(source))
      .pipe(sass({ outputStyle: "compressed" }))
        // .pipe(rename({ suffix: ".min" }))
        .pipe(sass().on('error', sass.logError))
      .pipe(dest("./src/scss/"))
    //   .pipe(dest("./build/css"))
      // .pipe(browsersync.stream())
      
      .pipe(browserSync.reload({ stream: true }));
  
};
// js
function scripts() {
   const source = "src/js/*.js";
  return src(source)
   
      // "src/libs/jquery/dist/jquery.min.js",
      // "src/libs/magnific-popup/dist/jquery.magnific-popup.min.js",
    
    .pipe(concat("js.min.js"))
    .pipe(uglify())
    .pipe(dest("./build/js"))
    .pipe(browsersync.stream());
};

// function js() {
//   const source = "./src/js/*.js";
//   return src(source)
//       .pipe(changed(source))
     
    
//       .pipe(dest("./build/js"))
//       .pipe(browsersync.stream())
  
// }


// css
function css() {
    const source = './src/scss/style.css';
    return src(source)
      .pipe(changed(source))
      .pipe(cssnano())
    //   .pipe(dest("src/scss/.css"))
      .pipe(dest("./build/css"))
      .pipe(browsersync.stream());
}

// images
function img() {
  const source = './src/images/*.*';
    return src(source)
        .pipe(imagemin())
        .pipe(dest("./build/images"))
        .pipe(browsersync.stream())
  
  
}


// html
function html() {
    return src('./src/*.html')
 .pipe(fileinclude({
     prefix: '@@'
   }))
        .pipe(dest('./build/'))
        .pipe(browsersync.stream())

}
// watch files
function watchFiles() {
    watch("./src/scss/*.scss", scss);
  watch('./src/scss/*', css);
    watch("./src/js/*", scripts);
watch("./src/*.html", html);
watch("./src/images/*", img);

}

// gulp.task('watch', 'scripts', function () {
//   gulp.watch("./src/js/*.js", browserSync.reload);
// })
// browserSync
function browserSync() {
    browsersync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    });
}

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(html, css, scss, scripts, img));