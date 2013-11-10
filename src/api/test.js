var assert = require("assert")
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/momtest');
mongoose.connection.on('open', function(){	
	console.log(mongoose);
	var UserSchema = require('../lib/documents/user');
	var User = UserSchema(mongoose);
	//User.collection.drop();
	  console.log(User.base.connections[0].host);
	//var user = new User({first:'Brian', last:'Scaturro', email:'brian@email.com', password:'mypass'});
    User.find({},function(err, results) {
      if (err) throw err;
	  console.log(User.base.connections[0].host);
	  console.log(results);
      mongoose.disconnect();
    });
});