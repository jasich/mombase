
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mother = require('./routes/mother')
  , volunteer = require('./routes/volunteer')
  , config = require('./config/application')
  , app = express()
  , Volunteer = require('../lib/documents/volunteer');

config.configure(app);

//application routes
app.get('/', routes.index);
app.post('/api/users/login', user.login);
app.post('/api/users', user.create);
app.get('/api/users', user.list);
app.get('/api/users/:id', user.get);
app.del('/api/users/:id', user.del);
app.put('/api/users/:id', user.update);

app.post('/api/volunteer/create', volunteer.create);


app.post('/api/mothers/search', mother.search);
app.post('/api/mothers/assign/:id', mother.assignVolunteer);
app.post('/api/mothers/unassign/:id', mother.unassignVolunteer);
app.post('/api/mothers', mother.create);
app.del('/api/mothers/:id', mother.del);
app.put('/api/mothers', mother.update);
app.get('/api/mothers/:id', mother.get);
app.post('/api/mothers/:id/children', mother.addChild);
app.put('/api/mothers/:id/children/:cid', mother.updateChild);
app.del('/api/mothers/:id/children/:cid', mother.deleteChild);
app.get('/api/mothers/:id/children/:cid', mother.getChild);

app.post('/api/volunteers/search', volunteer.search);
app.get('/api/volunteers/within', volunteer.within);
app.put('/api/volunteers', volunteer.update);
app.post('/api/volunteers', volunteer.create);
app.get('/api/volunteers/:id', volunteer.get);
app.del('/api/volunteers/:id', volunteer.del);


module.exports = app;


http.createServer(app).listen(app.get('port'), function(){
  Volunteer.setup();
  console.log('TEST');
  console.log('Express server listening on port ' + app.get('port'));
});
