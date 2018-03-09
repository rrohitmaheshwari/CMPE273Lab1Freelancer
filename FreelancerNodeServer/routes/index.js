var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Freelancer Server' });
});

/* POST user authentication. */
router.post('/users/authenticate', function(req,res) {
    var getUser = "select * from users where username='" + req.body.username+"' and password='" + req.body.password +"'";
    console.log("Query is:"+getUser);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                console.log("Login Successful!");
                console.log("results[0]:"+results[0]);
                res.status(201).send({user: results[0]});
            }
            else {
                console.log("Invalid Login!");
                res.statusMessage="The username and password you entered did not match our records. Please double-check and try again.";
                res.status(400).end();
            }
        }
    },getUser);
});


/* POST user registration. */
router.post('/users/register', function(req,res) {
    console.log(req.body);

    var insertQuery = "INSERT INTO `users` (`name`,`email`, `username`, `password`,`looking_for`) VALUES ('" + req.body.Name +"','"+req.body.Email + "', '" + req.body.username + "', '" + req.body.password +"', '" + req.body.looking_for + "')";
    mysql.fetchData(function (err, results) {
        if (err) {
            if(err.message.includes("'username_UNIQUE'")) {
                res.statusMessage = "This username already exists!";
            }else if(err.message.includes("'email_UNIQUE'")) {
                res.statusMessage = "This email address is already in use!";
            }
                console.log("reject");
            res.status(400).end();
        }
        else {
            res.status(200).send({user:'User created successfully!'});
        }
    }, insertQuery);

});


module.exports = router;
