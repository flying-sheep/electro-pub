import gulp from 'gulp'
import babel from 'gulp-babel'

const paths = {
	js: 'client/src/*.js',
}

gulp.task('compile:js', () =>
	gulp.src(paths.js, { since: gulp.lastRun('compile:js') })
		.pipe(babel())
		.pipe(gulp.dest('client')))

gulp.task('watch:js', () =>
	gulp.watch(paths.js, gulp.series('compile:js')))

gulp.task('default', gulp.series('watch:js'))
