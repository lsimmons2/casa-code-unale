var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var Server = require('karma').Server;


gulp.task('lint', function(){
	gulp.src('./public/*')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
})

gulp.task('front', function(done){
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
})

gulp.task('watch', function(){
	gulp.watch('public/*', ['frontTest']);
})

gulp.task('lt', function(){
	gulp.watch('public/service.js', ['front', 'lint'])
})

gulp.task('master', function(){
	nodemon({
		script: 'server.js',
		ext: 'js html',
		env: {'NODE_ENV': 'development'}
	})
	.on('start', ['front', 'lint'])
	.on('restart', ['front', 'lint'])
})

gulp.task('default', ['master'])


/*gulp.task('frontTest', function(){
	gulp.src('./test/profCtrl.spec.js', {read: false})
	.pipe(mocha())
	gulp.src('./test/signUpCtrl.spec.js', {read: false})
	.pipe(mocha())
});*/
