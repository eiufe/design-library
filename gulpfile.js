var gulp = require('gulp'),
    argv = require('yargs').argv,
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    header = require('gulp-header'),
    pathConfig = {
        projectsFolder: "projects",
        projectsSassSrcFolder: "projects/assets/sass/**/",
        projectsCssDestFolder: "projects/build/stylesheets/",
        designLibrarySrc: "./design-library/src/"
    },
    babel = require("gulp-babel"),
    fs = require("fs"),
    browserify = require("browserify"),
    babelify = require("babelify"),
    buffer = require("vinyl-buffer"),
    source = require("vinyl-source-stream"),
    uglify = require("gulp-uglify");


/* EIU Projects (VW/CGG) - CSS, JS, Watch Tasks */
gulp.task('project-styles', function() {
    return gulp.src([pathConfig.projectsSassSrcFolder + '*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(pathConfig.projectsCssDestFolder));
});
gulp.task('project-scripts', function() {
    argv.theme = argv.theme ? argv.theme : 'vw';

    var bundler = browserify("projects/assets/scripts/" + argv.theme + "-main.js");
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function(err) {
            console.error(err);
        })
        .pipe(source(argv.theme + "-main.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('projects/build/scripts'));
});
gulp.task("project-watch", function() {
    gulp.watch("projects/**/*.js", ['project-scripts']);
    gulp.watch("projects/**/*.scss", ['project-styles']);
});
gulp.task('project-server', function() {
    gulp.src('projects')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});


/* Design System - CSS, JS, Watch Tasks */
gulp.task('elements-styles', function() {
    return gulp.src([pathConfig.designLibrarySrc + '*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(pathConfig.designLibrarySrc + '/public/css'));
});
gulp.task('elements-scripts', function() {
    var bundler = browserify(pathConfig.designLibrarySrc + "dl.js");
    bundler.transform(babelify);
    bundler.bundle()
        .on('error', function(err) {
            console.error(err);
        })
        .pipe(source("dl.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(pathConfig.designLibrarySrc + 'public/js'));
});
gulp.task("elements-watch", function() {
    gulp.watch(pathConfig.designLibrarySrc + '**/**/*.scss', ['elements-styles']);
    gulp.watch(pathConfig.designLibrarySrc + '**/*.scss', ['elements-styles']);
    gulp.watch(pathConfig.designLibrarySrc + '/*.scss', ['elements-styles']);
    gulp.watch(pathConfig.designLibrarySrc + 'components/**/**/*.js', ['elements-scripts']);
    gulp.watch(pathConfig.designLibrarySrc + '/*.js', ['elements-scripts']);
});




/* Design System Foundation (Fractal) - Configuration */

const fractal = require('@frctl/fractal').create();
const logger = fractal.cli.console;
const mandelbrot = require('@frctl/mandelbrot');
const myCustomisedTheme = mandelbrot({
    skin: "red",
    styles: ['default', '/css/dl.css']
});

fractal.components.set('default.status', null);
fractal.set('project.title', 'Elements');
fractal.components.set('path', pathConfig.designLibrarySrc + 'components');
fractal.components.set('default.preview', '@preview');
fractal.docs.set('path', pathConfig.designLibrarySrc + 'docs');
fractal.web.set('static.path', pathConfig.designLibrarySrc + '/public');
fractal.web.set('builder.dest', '../design-library/home');
fractal.web.theme(myCustomisedTheme);


/* Fractal Server and Build Tasks */

gulp.task('fractal:start', function() {
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});

gulp.task('fractal:build', function() {
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});


gulp.task("projects", ['project-scripts', 'project-styles', 'project-watch', 'project-server']);

gulp.task("elements", ['elements-styles', 'elements-scripts', 'elements-watch', 'fractal:start']);

gulp.task("build-elements", ['fractal:build']);

gulp.task("default", ['project-scripts', 'project-styles', 'elements-styles', 'elements-scripts', 'project-watch', 'project-server', 'fractal:start', 'elements-watch']);