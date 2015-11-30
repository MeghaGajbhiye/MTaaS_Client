var mysql = require('./mysql');
var customer_search;
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
	var myquery = "select * from smsm_login_tester where username = '"+req.session.uname+"' and status = 'pending'";
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

	var myquery= "update smsm_login_tester set tester_experience ="+testerExperience+",	 testing_type= '"+testingType+"', testing_tool= '"+ testingTool +"', testing_language= '"+ language +"' where username in ('"+req.session.uname+"')";

	mysql.fetchData(function(err, results) {
		var jsonstr=JSON.stringify(results);
		console.log("testing update:" + jsonstr);
		if (err) {
			throw err;
		} else {
			console.log("Update successfully made in smsm_login_tester table");
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
	
	//Get Customer details in search page

exports.customerdetails = function(req, res){
	var getUser="select * from app_info";

	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
				if(!err){
					console.log(results);
					customer_search=results[0].customer_username;
					console.log("customer_search" + customer_search);

					var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					res.send({"result":JSON.stringify(results)});
				}
				else {
					console.log(err);
				}
			}
			,getUser);
};

//fetch for test




exports.currentapp = function(req, res){

	var getUser="select * from app_info where tester_username='"+req.session.uname+"'";

	console.log("Query is: i am here inside currentapp");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
				if(!err){
					console.log(results);
					var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					res.send({"result":JSON.stringify(results)});
				}
				else {
					console.log(err);
				}
			}
			,getUser);
};


exports.testerinfo = function(req, res){
	console.log("uname is:"+ req.session.uname);
	var getUser="select * from smsm_tester_info where username='"+req.session.uname+"'";

	console.log("Query is: i am here inside testerinfo");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
				if(!err){
					console.log(results);
					var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					res.send({"result":JSON.stringify(results)});
				}
				else {
					console.log(err);
				}
			}
			,getUser);
};



exports.customerinfo = function(req, res){

	var getUser="select * from smsm_customer_info where username='"+customer_search+"'";

	console.log("Query is: i am here inside customerinfo");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
				if(!err){
					console.log(results);
					var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					res.send({"result":JSON.stringify(results)});
				}
				else {
					console.log(err);
				}
			}
			,getUser);
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


//customerdashboard
exports.customerdetail = function(req, res) {
	res.render('customerdetail');
};

exports.customerview = function(req, res) {
	res.render('customerview');
};


//LOGIN PAGE
exports.signin = function(req, res){

	console.log(req.param("name","password"));
	var name = req.param("name");
	var password = req.param("password");

	var myquery = "Select * from  smsm_login where username = '"+name+"'and password='"+password+"' ";
	mysql.fetchData(function(err,results){
		if(err)
		{
			throw err;
		}
		else
		{
			if(results.length > 0)

			{
				req.session.uname = results[0].username;
				var role= results[0].role;
				if(role == 'tester')
				{
				res.send({"status":199});
				}
				else if (role== 'customer')
				{
					res.send({"status":198});
				}
			}

			else
			{
				console.log("Invalid User Name & Password");
				res.send({"status":100});
			}

		}

	},myquery);
};


/*  main signin
//LOGIN

exports.signin = function(req, res){

	console.log(req.param("name","password"));
	var name = req.param("name");
	var password = req.param("password");

	var myquery = "Select * from  smsm_login where username = '"+name+"'and password='"+password+"' ";
	mysql.fetchData(function(err,results) {
		if (err) {
			throw err;
		}
		else {
			var jsonstr = JSON.stringify(results);
			console.log("jsonstr :" + jsonstr);
			if (jsonstr.length > 0) {


				req.session.uname = results[0].username;

				console.log("username is : " + req.session.uname);
				console.log("Entry successfully fetched from table");
				var role = results[0].role;
				console.log("role: " + role);
				res.render('login');

				if (role == 'tester') {
					console.log("tester: " + role);
					//res.send({"status": 100});
					res.render('testerdashboard');
				}
				else if (role == 'customer') {
					console.log("Customer: " + role);
					res.send({"status": 200});
				}
			}


		}

	}, myquery);



};
*/
/*
//LOGIN PAGE
	exports.signin = function(req, res){
		
		console.log(req.param("name","password"));
		var name = req.param("name");
		var password = req.param("password");
		
		var myquery = "Select * from  smsm_login where username = '"+name+"'and password='"+password+"' ";


		mysql.fetchData(function(err,results){
					if(err)
						{
							throw err;
						}
					else
					{
						var jsonstr=JSON.stringify(results);
console.log("jsonstr :" + jsonstr);
						if(jsonstr.length > 0)
							{



								req.session.uname = results[0].username;

								console.log("username is : " + req.session.uname);
								var myquery1 = "Select tester_experience from  smsm_login_tester where username = '"+req.session.uname+"'";

								mysql.fetchData(function(err,results) {

									if (err) {
										throw err;
									}
									else {
										var jsonstr2=JSON.stringify(results);
										console.log("jsonstr2:" + jsonstr2[0]);
											if (jsonstr2.tester_experience!= null) {
											console.log("Test:" + jsonstr2);
											res.send({"status": 100});
										}
										else {
											console.log("Test json2 is null");

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
*/
//CUSTOMER SIGNUP
exports.signup_customer = function(req, res) {
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

	var myquery = "insert into smsm_login(username,password,email,First_Name,Middle_Name,Last_Name,Country,Phone,State, Address1, Address2, zip, linkedin_profile, active,role) values ('" + name + "','" + password + "','" + email + "','" + fname + "','" + mname + "','" + lname + "','" + country + "','" + phone + "','" + state + "','" + address1 + "','" + address2 + "','" + zip + "','" + linkedin + "','y','customer')";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("Entry successfully made in login table");
			res.render('login');

		}
	}, myquery);



};

//TESTER SIGNUP
			exports.signup_tester = function(req, res) {
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

				var myquery = "insert into smsm_login(username,password,email,First_Name,Middle_Name,Last_Name,Country,Phone,State, Address1, Address2, zip, linkedin_profile, active,role) values ('" + name + "','" + password + "','" + email + "','" + fname + "','" + mname + "','" + lname + "','" + country + "','" + phone + "','" + state + "','" + address1 + "','" + address2 + "','" + zip + "','" + linkedin + "','y','tester')";
				
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
								console.log("Entry successfully made in login table");
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

exports.sendrequest = function(req, res){

	console.log("Entry successfullymade in sendrequest");

	var myquery = "update app_info set tester_request = concat(tester_request, ' "+req.session.uname+"') where customer_username = '"+customer_search+"'";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("Entry successfully made in login table");

			res.render('searchcustomer');
		}
	}, myquery);


};
	   	
