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


// Setting up project specific build

gulp.task('sassToCss', function() {
    return gulp.src([pathConfig.projectsSassSrcFolder + '*.scss'])
        .pipe(sass())
        .pipe(gulp.dest(pathConfig.projectsCssDestFolder)); //"projects/assets/scripts/" + argv.theme + "-main.js"
});


gulp.task('js', function() {
    //argv.theme = argv.theme ? argv.theme : 'vw';

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

gulp.task('webserver', function() {
    gulp.src('projects')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task("watch", function() {
    gulp.watch("projects/**/*.js", ['js']);
    gulp.watch("projects/**/*.scss", ['sassToCss']);
});

// Setting up and running the design library
const fractal = require('@frctl/fractal').create();

fractal.set('project.title', 'EIU Design Library');
fractal.components.set('path', pathConfig.designLibrarySrc + 'components');
fractal.docs.set('path', pathConfig.designLibrarySrc + 'docs');

const logger = fractal.cli.console;

gulp.task('fractal:start', function() {
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});


gulp.task("server", ['js','sassToCss','watch', 'webserver','fractal:start']);