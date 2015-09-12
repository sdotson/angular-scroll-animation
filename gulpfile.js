var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ghpages = require('gulp-gh-pages'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    del = require('del'),
    karma = require('gulp-karma'),
    inject = require('gulp-inject'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence');

gulp.task('browser-sync', function() {
    browserSync.init(["app/**", 'app/**','app/**'], {
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('sass', function () {
    gulp.src('app/assets/sass/**/*')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('app/assets/css'));
});

gulp.task('test', function() {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});

var files = ['app/assets/css/*.css',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-resource/angular-resource.js',
            "app/bower_components/Chart.js/Chart.min.js",
            'app/bower_components/angular-chart.js/dist/angular-chart.js',
            'app/app.js',
            'app/common/services/candidates.js',
            'app/common/directives/cfaImage.js',
            'app/components/candidate/candidate.js',
            'app/components/home/home.js',
            'app/assets/images/*.jpg',
            'app/assets/images/*.png',
            'app/production.min.js',
            'app/production.min.js.map',
            'app/vendor.min.js',
            'app/vendor.min.js.map',
            'app/bower_components/angular-chart.js/dist/angular-chart.css',
            'app/index.html',
            'app/**/*.html'
            ];

var jsFiles = [
    'app/app.js',
    'app/common/services/candidates.js',
    'app/common/directives/cfaImage.js',
    'app/components/candidate/candidate.js',
    'app/components/home/home.js'
];

var jsFilesVendor = [
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-route/angular-route.js',
    'app/bower_components/angular-animate/angular-animate.js',
    'app/bower_components/angular-resource/angular-resource.js',
    "app/bower_components/Chart.js/Chart.min.js",
    'app/bower_components/angular-chart.js/dist/angular-chart.js'
]

gulp.task('minifyJs', ['minifyJsVendor'], function () {
    return gulp.src(jsFiles) //select all javascript files under js/ and any subdirectory
        .pipe(sourcemaps.init())
        .pipe(concat('production.min.js')) //the name of the resulting file
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/')) //the destination folder
        .pipe(notify({ message: 'Finished minifying app JavaScript'}));
});

gulp.task('minifyJsVendor', function () {
    return gulp.src(jsFilesVendor) //select all javascript files under js/ and any subdirectory
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js')) //the name of the resulting file
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/')) //the destination folder
        .pipe(notify({ message: 'Finished minifying vendor JavaScript'}));
});

gulp.task('jsInject', function () {
    return gulp.src('./dist/index.html')
      .pipe(inject(gulp.src('production.min.js', {read: false, cwd:"./dist/"}), {relative: true, addRootSlash:false}))
      .pipe(inject(gulp.src('vendor.min.js', {read: false, cwd:"./dist/"}), {relative: true, addRootSlash:false, starttag: '<!-- inject:vendor:{{ext}} -->'}))
      .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function (cb) {
  del([
    'dist/**'
  ], cb);
});

gulp.task('build', function() {
    return gulp.src(files,{base:'./app'})
    .pipe(gulp.dest('./dist'));
});

gulp.task('sequence', function(callback) {
  runSequence('test',
              'clean',
              'build',
              'jsInject',
              callback);
});

gulp.task('deploy', ['sequence'],function() {
    return gulp.src('./dist/**/*').pipe(ghpages());
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("app/assets/sass/*/*.scss", ['sass']);
});