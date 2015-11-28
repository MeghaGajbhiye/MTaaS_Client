var mysql = require('./mysql');
/*
 * GET users listing.
 */
//var uname;


//LOGOUT FUNCTION
exports.logoutsession = function(req,res){
console.log("checking logout");	
req.session.destroy();
res.send({"status":200});
};
	

//MAINTAINING SESSION LOGIN
exports.checksession = function(req, res){
	console.log("checking session");
	console.log(req.session.uname);
	  if(req.session.uname)
		  {
		  console.log("session is"+req.session.uname);
		  res.send({"status":200});
		  }
	  else
		  {
		  res.send({"status":300});
		  }
	};


//login info

exports.username = function(req, res){
	console.log(req.session.uname);
	var myquery = "select * from smsm_login where username = '"+req.session.uname+"'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(results);
			var jsonstr=JSON.stringify(results);
			console.log(jsonstr);
			console.log("Entry successfully fethced and displayed on GUI");
			//res.send(JSON.stringify(results));
			res.send({"result":jsonstr});
		}
	}, myquery);

};

exports.testerdetail = function(req, res) {

	console.log(req.param("experience","testingtype","testingtool","language"));
	var testerExperience = req.param("experience");
	var testingType = req.param("testingtype");

	var testingTool = req.param("testingtool");
	var language = req.param("language");

	var myquery = "insert into smsm_testerinfo(username,tester_experience,testing_type,testing_tool,testing_language) values ('"+req.session.uname+"','"+testerExperience+"','" + testingType + "','" + testingTool + "','" + language + "')";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("Entry successfully made in suppliersignup table");
		}
	}, myquery);
};

exports.list = function(req, res){
  res.send("respond with a resource");
};
// CALLING HOME PAGE FROM LOGIN PAGE
exports.showlogin = function(req, res){
	  res.render('home');
	 
	};
//CALLING LOGIN 
	
	exports.login = function(req, res){
		  res.render('login');
	};
	
	
	//CALL TESTER MY PROJECT
	exports.testerproject = function(req, res){
		  res.render('testerproject');
		};//CALL TESTER DASHBOARD 
		exports.testerdashboard = function(req, res){
			  res.render('testerdashboard');
			};//CALL TESTER PROFILE PAGE
			exports.home3 = function(req, res){
				  res.render('testerhome');
				};
//CALL DEVELOPER DASHBOARD
	exports.developerdashboard = function(req, res){
		  res.render('developerdashboard');
		};
/* TESTER DETAIL
exports.testerdetail = function(req, res){
	res.render('testerdetail');
};
*/
//CALL DEVELOPER MY PROJECT
		exports.developermyproject = function(req, res){
			  res.render('developermyproject');
			};
//CALL DEVELOPER PROFILE
			exports.home2 = function(req, res){
				  res.render('home');
				};
// CALLING TESTER SIGNUP PAGE FROM  LOGIN PAGE
exports.showsignup = function(req, res){
		  res.render('testersignup');
		};
// CALLING DEVELOPER SIGNUP PAGE FROM  LOGIN PAGE
		exports.showsignupd = function(req, res){
			  res.render('developersignup');
			};	
//TERMS AND CONDITION PAGE			
			exports.terms = function(req, res){
				  res.render('terms');
				};

//LOGIN PAGE
	exports.signin = function(req, res){
		
		console.log(req.param("name","password"));
		var name = req.param("name");
		var password = req.param("password");
		
		var myquery = "Select * from  smsm_login_tester where username = '"+name+"'and password='"+password+"' ";


		mysql.fetchData(function(err,results){
					if(err)
						{
							throw err;
						}
					else
					{
						req.session.uname = results[0].username;
						var jsonstr=JSON.stringify(results);
						if(jsonstr.length > 0)
							{


								var myquery1 = "Select tester_experience from  smsm_login_tester where username = '"+name+"'";
								mysql.fetchData(function(err,results) {
									if (err) {
										throw err;
									}
									else {
										var jsonstr1=JSON.stringify(results);
										if (jsonstr1.tester_experience!= null) {
											console.log("Test:" + jsonstr1);
											res.send({"status": 100});
										}
										else {
											res.send({"status": 101});
										}
									}
								},myquery1);

								console.log("after second query ***************************************************");
							}
						else
							{
							console.log("Invalid User Name & Password");
							res.send({"status":102});
							}

						}
					
				},myquery);
			};
//TESTER SIGNUP PAGE
			exports.signup = function(req, res) {
				console.log(req.param("fname","mname", "lname", "email", "name", "phone", "password",
						"address1", "address2", "country", "state", "linkedin","zip"));
				var fname = req.param("fname");
				var mname = req.param("mname");
				var lname = req.param("lname");
				var email = req.param("email");
				var name = req.param("name");
				var phone = req.param("phone");
				var password = req.param("password");
				var address1 = req.param("address1");
				var address2 = req.param("address2");
				var country = req.param("country");
				var state = req.param("state");
				var zip = req.param("zip");
				var linkedin = req.param("linkedin");

				var myquery = "insert into smsm_login_tester(username,password,email,First_Name,Middle_Name,Last_Name,Country,Phone,State, Address1, Address2, zip, linkedin_profile, active) values ('" + name + "','" + password + "','" + email + "','" + fname + "','" + mname + "','" + lname + "','" + country + "','" + phone + "','" + state + "','" + address1 + "','" + address2 + "','" + zip + "','" + linkedin + "','y')";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {

						console.log("Entry successfully made in testersignup table");
							res.render('login');

					}
				}, myquery);
				
				

			};

//DEVELOPER SIGN UP PAGE
			
exports.developersignup = function(req, res) {
	console.log(req.param("fname", "lname", "email", "name", "password",
			"cpassword", "sex", "projecttype","projectname"));
	var fname = req.param("fname");
	var lname = req.param("lname");
	var email = req.param("email");
	var name = req.param("name");
	var password = req.param("password");
	var cpassword = req.param("cpassword");
	var sex = req.param("sex");
	var projecttype = req.param("projecttype");
	var projectname = req.param("projectname");

	var myquery = "insert into developersignup (firstname1,lastname1,email1,username1,password1, cpassword1, sex1,projecttype1,type1)values ('" + fname + "','" + lname + "','" + email + "','" + name + "','" + password + "','" + cpassword + "','" + sex + "','" + projecttype + "','" + projectname + "')";
	
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var myquery2 = "insert into authenticate (username,passwordd)values ('" + name + "', '" + password + "')";
			
			mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				} else {
					console.log("Entry successfully made in authenticate table");
					res.render('login');
				}
			}, myquery2);
			console.log("Entry successfully made in developersignup table");
		}
	}, myquery);
	
	

};

//FETCH DATA FROM DATABASE

//<script> 
//Functions to open database and to create, insert data into tables
   
   exports.home = function(req, res){
	   console.log(req.session.uname);
	   var myquery = "select * from testersignup where username = '"+req.session.uname+"'";
	   mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log(jsonstr);
				console.log("Entry successfully fethced and displayed on GUI");
				//res.send(JSON.stringify(results));
					res.send({"result":jsonstr});
			}
		}, myquery);
	   
	   
	   	};
	   	
	   	
	   	
