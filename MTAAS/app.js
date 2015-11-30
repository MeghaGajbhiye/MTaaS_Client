
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
app.use(express.cookieParser());
app.use(express.session({secret:'Mtaas',duration:30*60*1000}));

// all environments
app.set('port', process.env.PORT || 3044);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development'  === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/signup_tester',user.signup_tester);
app.get('/testerdashboard',user.testerdashboard);
app.get('/customerdetail',user.customerdetail);
app.post('/signup_customer',user.signup_customer);
app.post('/developersignup',user.developersignup);
app.post('/signin',user.signin);
app.post('/testerdetail',user.testerdetail);
app.get('/home', user.showlogin);
app.get('/login', user.login);
app.get('/shwsignup', user.showsignup);
app.get('/shwsignupd', user.showsignupd);
app.get('/terms', user.terms);
app.get('/username',user.username );
app.get('/testerdetail', user.testerdetail);
app.get('/customerdetails', user.customerdetails);
//app.get('/logout', user.logout);
app.get('/home1', user.home);
app.get('/checksession', user.checksession);
//app.get('/emails', user.emails);

app.get('/developerdashboard',user.developerdashboard);
app.get('/logoutsession',user.logoutsession);
//app.get('/checklogout', user.checklogout);

app.get('/developermyproject',user.developermyproject);

app.get('/home2',user.home2);

var MtaasRouteConfig = require('./routes/MtaasRouteConfig.js');
new MtaasRouteConfig(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
