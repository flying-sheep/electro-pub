import gulp from 'gulp'
import babel from 'gulp-babel'

const paths = {
	js: {
		src: 'client/src/**/*.js',
		dest: 'client/build',
	},
}

gulp.task('compile:js', () =>
	gulp.src(paths.js.src, { since: gulp.lastRun('compile:js') })
		.pipe(babel())
		.pipe(gulp.dest(paths.js.dest)))

gulp.task('watch:js', () =>
	gulp.watch(paths.js.src, gulp.series('compile:js')))

gulp.task('default', gulp.series('watch:js'))
