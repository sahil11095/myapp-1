var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var html=require('html');
var validation=require("validator");
var app = express();

var sqlquery;


app.use(express.static('public'));
app.get('/', function (req, res) {
   fs.readFile("/index.html" );
});



app.get('/download',function(req,res){
	var connection=mysql.createConnection({
  		host : 'localhost',
  		user : 'root',
  		password : 'admin',
  		database: 'mysql'
	});

	connection.connect();
	var sqlquery='SELECT * FROM Details';
	connection.query(sqlquery,function(err, rows, fields){
		if(!err){
			console.log("The rows are:",rows);
			res.send("Yippppeee");

		}
		else{
			console.log("Extracting Problem");
		}

	});

	connection.end();

});








app.get('/process_get', function (req, res) {

	var connection=mysql.createConnection({
  		host : 'localhost',
  		user : 'root',
  		password : 'admin',
  		database: 'mysql'
	});

	connection.connect();
    response = {    
    	Name : req.query.name1,
    	Email : req.query.email
	};

   	if(!validation.isEmail(req.query.email)) {
        res.send("Email is invalid!!!");
    } else if(validation.isNull(req.query.name1)){
        res.send("Name field cannot be Empty!!!");
    }
    else{
    		sqlquery= 'INSERT INTO Details SET ?';
			connection.query(sqlquery,response,function(err, rows, fields){
				if(!err){
					res.send("Form submitted");
				}
				else{
					res.send("Error in submitting the form");
				}

			});
        
    }
	console.log(response);
	var json=JSON.stringify( response );
	console.log(json); 
	fs.writeFile('mailDetails.txt',function(err){
		if(!err){
			console.log("File Created:)");
		}
		else{
			console.log("Problem in Extracting Data");
		}
	});
	connection.end();
});





app.listen(8084);