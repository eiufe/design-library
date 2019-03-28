var gulp = require('gulp'),
    argv = require('yargs').argv,
    webserver = require('gulp-webserver');

gulp.task('default', function() {
    // console.log(argv.theme);
    return;
});

gulp.task('webserver', function() {
    gulp.src('../design-library')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});
var sass = require('gulp-sass');
var header = require('gulp-header');

gulp.task('build_css', function() {
  return gulp.src(['assets/sass/*.scss'])
   .pipe(header('$theme: ' + argv.theme + ';\n'))
   .pipe(sass())
   .pipe(gulp.dest('build/stylesheets/'));
   
});

gulp.task('test', gulp.series('build_css', 'webserver'));