var mongoose = require('mongoose');
var User = mongoose.model("User");
function sessionController(){
	this.login = function(req, res){
		User.findOne({name: req.body.name}, function(err, user){
			if(!user){
				console.log('adding and logging in,', req.body.name)
				var user = new User(req.body)
				user.save(function(err, data){
					if(err){
						console.log('Error: ', err)
					} else {
						req.session.user = data
						req.session.save()
						return res.json({user: data})
					}
				})
			} else if(user.name == req.body.name){
				console.log(user.name, 'exists, logging in')
				req.session.user = user
				req.session.save()
				return res.json({user: user})
			}
		})
	}
	this.logout = function(req, res){
		console.log(req.session.user.name, 'is logging out')
		req.session.destroy()
		res.redirect('/')
	}
	this.checkUser = function(req, res){
		if(req.session.user){
			res.json({user:req.session.user})
		} else {
			res.json({user: null})
		}

	}
	this.getUser = function(req,res){
		console.log(req.params.id)
		User.findOne({_id: req.params.id }, function(err, user){
			if(err){
				console.log('getUser Error: ', err)
				return res.json({ user: null})
			} else {
				return res.json({ user: user})
			}
		})
	}
}
module.exports = new sessionController();
