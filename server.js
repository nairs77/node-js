var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

//var User = require('./app/models/user');
var app = express();
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API ROUTES -------------------
// we'll get to these in a second
app.use('/api',express.Router());

var routes = require('./api/index');
var users = require('./api/users');
var pay = require('./api/pay');

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.use('/', routes);
app.use('/api', routes);
app.use('/api/users', users);
 app.use('/api/pay', pay);


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);