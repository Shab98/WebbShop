var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// Create Express app
var app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

var productsController = require('./controllers/products');
var categoriesController = require('./controllers/categories');
var sellersController = require('./controllers/sellers');
var usersController = require('./controllers/users');

// Variables
const dbAddress = "user:cocacolabro@cluster0-xywi5.mongodb.net";
const dbPort = "27017";
const dbName = "webshop";
var mongoURI = process.env.MONGODB_URI || `mongodb+srv://${dbAddress}/${dbName}`;
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

//DB STRUCTURE:
/*
    seller{}
    user{
        paymentinfo{}
    }
    product{
        reference to category
        reviews{}
    }
    category{}

    Seller is standalone,
    user has inside its JSON paymentinfo,
    product has inside its JSON the reference to find the category and the reviews,
    category is standalone 
*/


// Parse requests of content-type 'application/json'
app.use(bodyParser.json());
app.use(cors());


// Define routes
app.get('/api', function(req, res) {
    res.json({ 'message': 'Welcome to G7\'s backend ExpressJS project!' });
});
app.use('/api/products', productsController);
app.use('/api/categories', categoriesController);
app.use('/api/sellers', sellersController);
app.use('/api/users', usersController);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function(req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});


//Error handling
var env = app.get('env');

app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        "message": err.message,
        "error": {}
    };
    if (app.get('env') === 'development') {
        err_res["error"] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;