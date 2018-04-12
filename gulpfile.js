const gulp = require('gulp'),
	  concat = require('gulp-concat'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		gutil = require('gulp-util'),
		uglify = require('gulp-uglify'),
		browserify = require('browserify'),
		watchify = require('watchify'),
		assign = require('lodash.assign'),
		babelify = require('babelify'),
		sourcemaps = require('gulp-sourcemaps'),
		clean = require("gulp-clean"),
		gulpCopy = require('gulp-copy'),
		cleanCss = require("gulp-clean-css");

const servePath = 'dist/public';
const devServePath = 'src/public';
const devCssServePath = devServePath+'/stylesheets/';
const devJsPath = 'src/frontEndJS/dependencies/';
const sourceRoot = 'src';
const jsPath = sourceRoot + '/frontEndJS';

const concatJSFiles = [devJsPath+'jquery-3.2.1.min.js', devJsPath+'parsley.min.js', devJsPath+'fontawesome-all.min.js', devJsPath+'bundle.js'];

const concatCSSFiles = [devCssServePath+'bootstrap.min.css', devCssServePath+'animate.min.css', devCssServePath+'base.css', devCssServePath+'mainNav.css',
	devCssServePath+'sideNav.css', devCssServePath+'footer.css',  devCssServePath+'formValidation.css',
	devCssServePath+'classUtilities.css'];



// add custom browserify options here
const customOpts = {
	entries: [jsPath + '/app.js'],
	debug: true
};
const opts = assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts)).transform(babelify, { presets: ['es2015'] });

gulp.task('buildJsProd', bundleProd);

gulp.task('buildJs', bundle);

gulp.task('concatCssProd', () => {
	return gulp.src(concatCSSFiles)
		.pipe(concat('bundle.css'))
		.pipe(cleanCss())
		.pipe(gulp.dest('dist/public/stylesheets'))
});

gulp.task("moveLargeAssets", () => {
	gulp.src('src/public/showcase/*/**')
		.pipe(gulp.dest('dist/public/showcase'));
});

gulp.task('buildCssProd', ['concatCssProd'], () => {
	return process.exit(0);
});

gulp.task('watchJs', function() {
	gulp.watch(['src/frontEndJs/**/*.js'], ['concatScripts']);
});

gulp.task('concatScriptsProd', ['buildJsProd'], () => {
	return gulp.src(concatJSFiles)
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest(servePath+'/js'))
});

gulp.task('concatScripts', ['buildJs'], () => {
	return gulp.src(concatJSFiles)
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest(devServePath+'/js'))
});

// gulp.task('buildSourceMaps', ['concatScripts'],  () => {
// 	return gulp.src(devJsPath+'bundle.js')
// 		.pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
// 		.pipe(sourcemaps.write('./')) // writes .map file
// 		.pipe(gulp.dest(devServePath+'/js'));
// });

gulp.task('build', ['concatScripts'], () => {
	return process.exit(0);
});
gulp.task('buildProd', ['concatScriptsProd'], () => {
	return process.exit(0);
});

gulp.task('cleanDist', () => {
	return gulp.src('dist/*')
		.pipe(clean());
});


function bundle() {
	if (!b) return console.log('Sorry, something went wrong');
	return b.bundle()
	// log errors if they happe
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		// optional, remove if you don't need to buffer file contents
		.pipe(buffer())
		// optional, remove if you dont want sourcemaps
		.pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
		.pipe(sourcemaps.write('./')) // writes .map file
		.pipe(gulp.dest(devJsPath));
}


function bundleProd() {
	if (!b) return console.log('Sorry, something went wrong');
	return b.bundle()
	// log errors if they happe
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		// optional, remove if you don't need to buffer file contents
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(devJsPath));
}
