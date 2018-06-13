var User = require('./models/user');

function getUsers(res) {
    User.find(function (err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(users); // return all todos in JSON format
    });
};
function gethash(v) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(v).digest("hex");
}
function duplicate(req,res,next) {
    User.find({
        email: req.body.email
    }, function (err, user) {
        console.log(user)
        if (err) {
            res.status(500).send(err); return;
        } else if (user.length>0) {
            res.status(302).send('duplicate'); return;     // This runs.
        } else {
            next();
        }   
    });
}
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/users', function (req, res) {
        // use mongoose to get all todos in the database
        getUsers(res);
    });
    app.post('/api/usercheck',function(req,res){
        //console.log(gethash(req.params.password))
        User.find({
            email: req.body.email,
            password: gethash(req.body.password) 
        }, function (err, user) {
            if (err)
                res.send(err);
            if(user.length>0) res.json(user);
            else res.send("incorrect");
        });
    });
    // create todo and send back all todos after creation
    //app.use(duplicate);
    app.post('/api/user',duplicate, function (req, res) {
        // create a todo, information comes from AJAX request from Angular
        //-----save----------
        User.create({
            //email: req.body.email,
            //password: req.body.password
            email: req.body.email,
            password: gethash(req.body.password)
        }, function (err, user) {
            if (err){
                console.log(err);
                res.status(500).json(err);
            }else{
                // get and return all the todos after you create another
                //res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(user);
            }
        });
       
    });
    // delete a todo
    app.delete('/api/user/:user_id', function (req, res) {

        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);

            getUsers(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
