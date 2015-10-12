var atImport        = require('postcss-import'),
    autoprefixer    = require('autoprefixer'),
    browserReporter = require('postcss-browser-reporter'),
    gulp            = require('gulp'),
    cssNano         = require('cssnano'),
    cssNext         = require('cssnext'),
    nested          = require('postcss-nested'),
    postcss         = require('gulp-postcss'),
    rename          = require('gulp-rename'),
    browserSync     = require('browser-sync');

var reload = browserSync.reload;

gulp.task('browser-sync', function () {
    browserSync({
        proxy    : {
            target: "localhost:4567",
            ws    : true
        },
        startPath: "/admin/plugins/utils"
    });
});

gulp.task('css', function () {
    var processors = [
        atImport,
        autoprefixer({browsers: ['last 2 version']}),
        nested,
        browserReporter,
        cssNext(),
        cssNano()
    ];
    return gulp.src('./style/*.css')
        .pipe(postcss(processors))
        .pipe(rename('acp.css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('scripts', function () {
});

gulp.task('watch', function () {
    gulp.watch('style/**/*.css', ['css', browserSync.reload]);
});

gulp.task('default', ['css', 'browser-sync', 'scripts', 'watch']);