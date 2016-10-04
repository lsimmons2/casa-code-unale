var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gutil = require('gulp-util');
var Server = require('karma').Server;


gulp.task('lint', function(){
	gulp.src('./public/*')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
})

gulp.task('front', function(done){
  new Server({
    configFile: __dirname + '/test/public/karma.conf.js',
    singleRun: true
  }, done).start();
})

gulp.task('watchBack', function(){
	gulp.watch('/test/server/server.spec.js', ['back']);
});

gulp.task('back', function(){
  gulp.src(['test/server/auth.js'], {read: false})
  .pipe(mocha())
  .on('error', gutil.log);
});


gulp.task('dev', function(){
	nodemon({
		script: 'server.js',
		ext: 'js html',
		env: {'NODE_ENV': 'dev'}
	})
	.on('start', ['lint'])
})

gulp.task('default', ['dev'])
