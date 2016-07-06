//modules
//================================================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var request = require('request');
var cors = require('cors');
var path = require('path');


//configuration
//================================================================================================
//var port = process.env.PORT || 8080;
var uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri);


app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));


//routes
//================================================================================================
//require('./app/routes')(app);
var userSchema = require('./app/userModel');
var User = mongoose.model('User', userSchema);
var basicRouter = express.Router();

/*app.get('/board', function(req, res){
	res.json()
})*/

basicRouter.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

/*basicRouter.get('/', function(req, res){
	res.json({message: 'welcome to the api'});
});*/

/*basicRouter.get('/users', function(req, res){
	res.send('api is working');
});*/
basicRouter.route('/board')
	.get(function(req, res){
		User.find(function(error, users){
			if(error){
				console.log('There was an error receiving the board get request');
				res.send('There was an error with the board get request');
			}
			else{
				console.log('Request recieved successfuly by Express');
				res.json(users);
			}
			//console.log(users);
			//res.send('here\'s the data!\n' + users);
			//res.json(users);
		});
	});

basicRouter.route('/users')
	.post(function(req, res){
		var user = new User();
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.userID = req.body.userID;
		user.email = req.body.email;
		user.skillsTO = req.body.skillsTO;
		user.skillsTL = req.body.skillsTL;
		user.bio = req.body.bio;
		user.avatar = req.body.avatar;
		user.save(function(error){
			if(error){
				console.log('There was an error');
				res.send(error);
			}
			else{
				res.json({message: 'User created'});
			}
		});
	})

	.get(function(req, res){
		User.find(function(error, users){
			if(error){
				res.send(error);
			}
			res.json(users);
		});
	});

/*basicRouter.route('/users/:user_id')
	.get(function(req, res){
		User.findById(req.params.user_id, function(error, user){
			if (error){
				res.send(error);
			}
			else{
				res.json(user);
			}
		});
	})
	.put(function(req, res){
		User.findById(req.params.user_id, function(error, user){
			if(error){
				res.send(error);
			}
			else{
				user.firstName='King Leo';
				user.save(function(error){
					if(error){
						res.send(error);
					}
					else{
						res.json({message: 'User updated'});
					}
				});
			}
		});
	})
	.delete(function(req, res){
		User.remove({
			_id: req.params.user_id
		}, function(error, bear){
			if(error)
				res.send(error)
			res.json({message: 'user successfully deleted'});
		});
	});*/

app.use('/', basicRouter);


//start app
//================================================================================================
//app.listen(port);
//console.log('App connected to port ' + port);

app.listen(3000, function(){
	console.log('App running on port 3000');
})


//WHY DO YOU NEED 'exports ='
exports = module.exports = app;
