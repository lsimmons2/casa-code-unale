var User = require('./models/user');


	module.exports = function(app){
		//server routes ==============================================================================
		//if error, nothing after will execute, if no error, returns all users in JSON format
		app.get('/api/users', function(req, res){
			User.find(function(error, users){
				if (error){
					res.send(error);
				}
				res.json(users);
			});
		});
		app.get('*', function(req, res){
			res.sendFile('/Users/leosimmons/CS/scotchWebapp/public/index.html');
		});
	};