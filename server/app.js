var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var productsController = require('./controllers/products');
var categoriesController = require('./controllers/categories');
var sellersController = require('./controllers/sellers');
var usersController = require('./controllers/users');

// Variables
const dbAddress = "localhost";
const dbPort = "27017";
const dbName = "webshop";
var mongoURI = process.env.MONGODB_URI || `mongodb://${dbAddress}:${dbPort}/${dbName}`;
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

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(bodyParser.json());


// Define routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to G7\'s backend ExpressJS project!'});
});
app.use('/api/products', productsController);
app.use('/api/categories', categoriesController);
app.use('/api/sellers', sellersController);
app.use('/api/users', usersController);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
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
