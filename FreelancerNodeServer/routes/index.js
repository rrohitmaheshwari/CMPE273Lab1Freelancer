var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Freelancer Server'});
});

/* POST user authentication. */
router.post('/users/authenticate', function (req, res) {
    console.log(req);
    var getUser = "select user_id,username,email,name,summary,phone,about_me,skills,looking_for from users where username='" + req.body.username + "' and password='" + req.body.password + "'";
    var username=req.body.username;

    mysql.fetchData(function (err, results) {
        if (err) {
            throw err;
        }
        else {
            if (results.length > 0) {
                req.session.username=username;
                console.log("Session initialized");
                console.log("Login Successful!");
                console.log("results[0]:" + results[0]);


                res.status(200).send({user: results[0]});
            }
            else {
                console.log("Invalid Login!");
                res.statusMessage = "The username and password you entered did not match our records. Please double-check and try again.";
                res.status(400).end();
            }
        }
    }, getUser);
});


/* POST user registration. */
router.post('/users/register', function (req, res) {
   // console.log(req.body);

        var insertQuery = "INSERT INTO `users` (`name`,`email`, `username`, `password`,`looking_for`) VALUES ('" + req.body.Name + "','" + req.body.Email + "', '" + req.body.username + "', '" + req.body.password + "', '" + req.body.looking_for + "')";
        mysql.fetchData(function (err, results) {
            if (err) {
                if (err.message.includes("'username_UNIQUE'")) {
                    res.statusMessage = "This username already exists!";
                } else if (err.message.includes("'email_UNIQUE'")) {
                    res.statusMessage = "This email address is already in use!";
                }
                console.log("reject");
                res.status(400).end();
            }
            else {
                res.status(200).send({user: 'User created successfully!'});
            }
        }, insertQuery);



});


/* POST user home details. */

router.post('/home/getdetails', function (req, res) {

    var sqlQuery = "SELECT *,count(user_projects_project_id) as bid_count from  (SELECT projects.project_id ,projects.emp_username,projects.title,projects.description,projects.budget_range,projects.skills_req, projects.status,DATE_FORMAT(projects.complete_by,'%d/%m/%Y') as niceDate,projects.file,user_projects.project_id as user_projects_project_id from  freelancerdb.projects left join freelancerdb.user_projects ON projects.project_id = user_projects.project_id Where status=\"OPEN\" ) as complete_table group by project_id";


    console.log("Requesting session User" + req.session.username);
   if (req.session.username) {
        mysql.fetchData(function (err, results) {
            if (err) {
                throw err;
            }
            else {
                if (results.length > 0) {
                    console.log("Fetch Successful!");
                    res.status(201).send({result: results});
                }
                else {
                    console.log("No data fetched!");
                    res.statusMessage = "No data fetched";
                    res.status(400).end();
                }
            }
        }, sqlQuery);
    }
    else
   {
       console.log("Session expired!");
       res.statusMessage = "Session expired!";
       res.status(400).end();

   }

});

router.get('/project/getprojectdetails', function (req, res) {



    var sqlQuery = "SELECT name,project_id,emp_username,title,description,budget_range,skills_req,file,DATE_FORMAT(projects.complete_by,'%d-%m-%Y') as complete_by_shortdate from  projects inner join users on  projects.emp_username =  users.username where project_id='"+req.query.project_id+"';";


    console.log("Requesting session User->" + req.session.username);
    if (req.session.username) {
        mysql.fetchData(function (err, results) {
            if (err) {
                throw err;
            }
            else {

                console.log("Fetch Project Details Successful!");
                res.statusMessage = "Data fetched";
                res.status(200).send({result: results});

            }
        }, sqlQuery);
    }
    else
    {
        console.log("Session expired!");
        res.statusMessage = "Session expired!";
        res.status(400).end();

    }

});



router.get('/project/getbidheader', function (req, res) {



    var sqlQuery = "SELECT count(*) as bid_count, avg(bid_price) as average_bid FROM freelancerdb.user_projects where project_id='"+req.query.project_id+"';";



    if (req.session.username) {
        mysql.fetchData(function (err, results) {
            if (err) {
                throw err;
            }
            else {

                console.log("Fetch Project Details Successful!");
                res.statusMessage = "Data fetched";
                res.status(200).send({result: results});

            }
        }, sqlQuery);
    }
    else
    {
        console.log("Session expired!");
        res.statusMessage = "Session expired!";
        res.status(400).end();

    }

});

router.post('/project/getdetails', function (req, res) {


    var sqlQuery="SELECT id,users.user_id,project_id,bid_price,days_req,username,name from  freelancerdb.user_projects left join  freelancerdb.users  on users.user_id = user_projects.user_id  where project_id='"+req.body.project_id+"'";
    console.log("Requesting session User>" + req.session.username);
    if (req.session.username) {
        mysql.fetchData(function (err, results) {
            if (err) {
                throw err;
            }
            else {

                    console.log("Fetch Project Details Successful!");
                    res.statusMessage = "Data fetched";
                    res.status(200).send({result: results});

            }
        }, sqlQuery);
    }
    else
    {
        console.log("Session expired!");
        res.statusMessage = "Session expired!";
        res.status(400).end();

    }

});


router.post('/project/postbiddata', function (req, res) {


    console.log("req.body");
console.log(req.body);


var deleteQuery="DELETE FROM `freelancerdb`.`user_projects` WHERE `user_id`='"+req.body.data.user_id+"' AND `project_id`='"+req.body.data.project_id+"';"
    var insertQuery = "INSERT INTO `freelancerdb`.`user_projects` (`user_id`, `project_id`, `bid_price`, `days_req`) VALUES ('"+req.body.data.user_id+"', '"+req.body.data.project_id+"', '"+req.body.data.bid_price+"', '"+req.body.data.days_req+"');";
    console.log("Requesting session User>" + req.session.username);
    if (req.session.username) {


        mysql.fetchData(function (err, results) {
            if (err) {
                throw err;
            }
            else {
                console.log(deleteQuery);
                console.log("Fetch Deleted");
                res.statusMessage = "Data Deleted";

                mysql.fetchData(function (err, results) {
                    if (err) {
                        throw err;
                        res.status(400).send("DB Fail");
                    }
                    else {
                        console.log(insertQuery);
                        console.log("Updated Details Successful!");
                        res.statusMessage = "Data Updated";
                        res.status(200).send({result: results});

                    }
                }, insertQuery);


            }
        }, deleteQuery);




    }
    else
    {
        console.log("Session expired!");
        res.statusMessage = "Session expired!";
        res.status(400).end();
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )


    }

});



router.post('/user/logout', function (req, res) {



    console.log("req.session.username:" + req.session.username);
    if(req.session.username) {
        req.session.destroy();
        console.log("Session Destroyed!");
        res.status(200).send({ message: "Logout" });
    } else {
        console.log("Session not found/already destroyed!");
        res.status(200).send({ message: "Logout" });
    }

});


module.exports = router;
