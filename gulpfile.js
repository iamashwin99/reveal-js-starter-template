const fs = require('fs');
const yargs = require('yargs')
const through = require('through2');

const sass = require('sass')

const gulp = require('gulp')
const zip = require('gulp-zip')
const minify = require('gulp-clean-css')
const connect = require('gulp-connect')
const autoprefixer = require('gulp-autoprefixer')

const root = yargs.argv.root || '.'
const port = yargs.argv.port || 8000
const host = yargs.argv.host || 'localhost'

// a custom pipeable step to transform Sass to CSS
function compileSass() {
  return through.obj( ( vinylFile, encoding, callback ) => {
    const transformedFile = vinylFile.clone();

    sass.render({
        silenceDeprecations: ['legacy-js-api'],
        data: transformedFile.contents.toString(),
        file: transformedFile.path,
    }, ( err, result ) => {
        if( err ) {
            callback(err);
        }
        else {
            transformedFile.extname = '.css';
            transformedFile.contents = result.css;
            callback( null, transformedFile );
        }
    });
  });
}

// Compile custom SCSS themes to dist/theme/
gulp.task('css-themes', () => gulp.src(['./css/theme/source/*.{sass,scss}'])
        .pipe(compileSass())
        .pipe(autoprefixer())
        .pipe(minify({compatibility: 'ie9'}))
        .pipe(gulp.dest('./dist/theme')))

// Copy images to dist/img/
gulp.task('images', () => {
    if (!fs.existsSync('./img')) {
        fs.mkdirSync('./img', { recursive: true });
    }
    return gulp.src(['./img/**/*'])
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('build', gulp.parallel('css-themes', 'images'))

gulp.task('default', gulp.series('build'))

gulp.task('package', gulp.series(async () => {
    let dirs = [
        './index.html',
        './dist/**',
        './*/*.md'
    ];

    if (fs.existsSync('./images')) dirs.push('./images/**');
    if (fs.existsSync('./slides')) dirs.push('./slides/**');

    return gulp.src( dirs, { base: './', encoding: false } )
        .pipe(zip('reveal-js-presentation.zip')).pipe(gulp.dest('./'))
}))

gulp.task('reload', () => gulp.src(['index.html'])
    .pipe(connect.reload()));

gulp.task('serve', () => {

    connect.server({
        root: root,
        port: port,
        host: host,
        livereload: true
    })

    const slidesRoot = root.endsWith('/') ? root : root + '/'
    gulp.watch([
        slidesRoot + '**/*.html',
        slidesRoot + '**/*.md',
        `!${slidesRoot}**/node_modules/**`,
    ], gulp.series('reload'))

    gulp.watch([
        'css/theme/source/**/*.{sass,scss}',
        'css/theme/template/*.{sass,scss}',
    ], gulp.series('css-themes', 'reload'))

    gulp.watch('./img/**/*', gulp.series('images', 'reload'))

})
