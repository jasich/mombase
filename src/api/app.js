
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
  , app = express();

config.configure(app);

//application routes
app.get('/', routes.index);
app.post('/api/users/login', user.login);
app.post('/api/volunteer/create', volunteer.create);

app.get('/api/mother', mother.get);
app.post('/api/mother', mother.create);
app.del('/api/mother', mother.del);
app.post('/api/mother/search', mother.search);

app.get('/api/volunteer', volunteer.get);
app.post('/api/volunteer', volunteer.create);
app.del('/api/volunteer', volunteer.del);
app.post('/api/volunteer/search', volunteer.search);

module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
