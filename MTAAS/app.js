
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
,serveStatic=require('serve-static');
//,serveStatic=require('serve-static');

var app = express();
app.use(express.cookieParser());
app.use(express.session({secret:'Mtaas',duration:30*60*1000}));

// all environments
app.set('port', process.env.PORT || 3046);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use('/public/',serveStatic(__dirname+'/public/'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development'  === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
//app.get('/about',user.about);
//app.get('/blog',user.blog);
//app.get('/contact',user.contact);
app.get('/customerdashboard',user.customerdashboard);
app.get('/customersignup',user.customersignup);
app.post('/Appdetail',user.Appdetail);
app.post('/save_customer',user.save_customer);
app.post('/signup_tester',user.signup_tester);
app.get('/testerdashboard',user.testerdashboard);
app.get('/testerinfo',user.testerinfo);
app.get('/testerinfo1',user.testerinfo1);
app.get('/testerinfo2',user.testerinfo2);
app.post('/tester',user.tester);
app.post('/bankdetail_tester',user.bankdetail_tester);
app.post('/bankdetail',user.bankdetail_tester);

app.post('/deviceinfo',user.deviceinfo);
app.get('/testedapp',user.testedapp);
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
app.get('/customerinfo', user.customerinfo);
app.get('/appinfo', user.appinfo);
app.post('/save_customer',user.save_customer);
app.get('/currentapp', user.currentapp);
app.get('/searchtester', user.searchtester);
app.get('/currentapp_customer', user.currentapp_customer);
app.post('/sendrequest', user.sendrequest);
app.post('/sendrequest2', user.sendrequest2);
app.get('/customerview', user.customerview);
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
