var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rev = require('gulp-rev'),
	revdel = require('gulp-rev-delete-original'),
	filter = require('gulp-filter'),
	copy = require('gulp-copy'),
	del = require('del');

// css run
gulp.task('css-run', ['rte-run'], function () {
	// delete old files
	del(['./css/**/*']);
	// create new files
	return gulp.src([
		'!./gulp/scss/rte.scss',
		'./gulp/scss/**/*.scss'
	])
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./css'));
	//.pipe(filter('**/*.css'))
	//.pipe(rev())
	//.pipe(revdel())
	//.pipe(gulp.dest('./css'))
	//.pipe(rev.manifest())
	//.pipe(gulp.dest('./css'));
});

// rte run
gulp.task('rte-run', function () {
	// create new file
	return gulp.src([
		'./gulp/scss/rte.scss'
	])
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./gulp/scss/move/'));
});

// css
gulp.task('css', ['css-run'], function () {
	return gulp.src([
		'./gulp/scss/move/**/*'
	])
	.pipe(gulp.dest('./css'));
});

// js
gulp.task('js', ['js-critical'], function () {
	// create new files
	return gulp.src([
		//'./gulp/scripts/jquery-ui.js',
		'./gulp/scripts/plugins/**/*.js',
		'./gulp/scripts/mvcfoolproof.unobtrusive.min.js',
		'./gulp/scripts/deferred.js',
		'./gulp/scripts/modules/**/*.js'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('deferred.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./js'));
	//.pipe(filter('**/*.js'))
	//.pipe(rev())
	//.pipe(revdel())
	//.pipe(gulp.dest('./js'))
	//.pipe(rev.manifest())
	//.pipe(gulp.dest('./js'));
});

// js critical
gulp.task('js-critical', function () {
	return gulp.src([
		'./gulp/scripts/jquery.js',
		'./gulp/scripts/critical.js'
	])
		.pipe(sourcemaps.init())
		.pipe(concat('critical.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./js'));
});

// build
gulp.task('build', ['css', 'js']);

// watch
gulp.task('watch', function () {
	gulp.watch('./gulp/scss/**/*.scss', ['css']);
	gulp.watch('./gulp/scripts/**/*.js', ['js']);
});