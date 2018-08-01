var express = require('express');   // get express server
var app = express(); //The app object is instantiated on creation of the Express server
var port = process.env.PORT || 8000; // get activate port

var morgan = require('morgan') // log files
var router = express.Router(); //// method that creates a new router object.
var bodyParser = require('body-parser'); //body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
var path = require('path'); // The Path module provides a way of working with directories and file paths
var mongoose = require('mongoose');  // get mongoose in project
var router = express.Router(); // method that create new router
var appRoute = require('./app/route/api')(router); // routing for database
// log files  logger
app.use(morgan('dev')); 
/*parse data */
app.use(bodyParser.json()); //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.urlencoded({ extended: true })); //The urlencoded function takes an option options object that may contain any of the key(extended: The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.)
app.use('/api', appRoute);

// get req.body output


//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(__dirname + '/public'));



//for connection to database
mongoose.connect('mongodb://localhost:27017/todo_database', function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connected to database');
    }
});


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + 'public/index.html'));
})

// port for connecting to client side
app.listen(port, function () {
    console.log(`connected to port ${port}`);
});