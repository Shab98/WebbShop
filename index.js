const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dbAddress = "localhost";
const dbPort = "27017";
const dbName = "webshop";
var db = mongoose.connect(`mongodb://${dbAddress}:${dbPort}/${dbName}`, { useNewUrlParser: true });

const Schema = mongoose.Schema;

var sellerSchema = new Schema({
    id: { type: String },
    name: { type: String }
});

var Seller = mongoose.model('sellers', sellerSchema);

var userSchema = new Schema({
    id: { type: String },
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    password: { type: String }
})

var User = mongoose.model('users', userSchema);

var categorySchema = new Schema({
    name: { type: String }
})

var Category = mongoose.model('categories', categorySchema);

var productSchema = new Schema({
    id: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number }
})

var Product = mongoose.model('products', userSchema);

var reviewSchema = new Schema({
    text: { type: String },
    rating: { type: Number },
    date: { type: Date }
})

var Review = mongoose.model('reviews', reviewSchema);

var paymentSchema = new Schema({
    id: { type: String },
    name: { type: String },
    cardnumber: { type: Number },
    ccv: { type: Number },
    month: { type: Number },
    year: { type: Number }
})

var PaymentInfo = mongoose.model('paymentinfos', paymentSchema);

app.use(express.json());

app.listen(3000, function() {
    console.log('App is listening on port 3000');
})

//GET METHODS

app.get('/', function(req, res) {
    res.send('Hello :)');
    console.log('Received connection');
});

app.get('/api/sellers', function(req, res) {
    res.send('List of sellers');
    console.log('Received connection');
});

app.get('/api/users', function(req, res) {
    res.send('List of users');
    console.log('Received connection');
});

app.get('/api/products', function(req, res) {
    res.send('List of products');
    console.log('Received connection');
});

app.get('/api/reviews', function(req, res) {
    res.send('List of reviews');
    console.log('Received connection');
});

app.get('/api/categories', function(req, res) {
    res.send('List of sellers');
    console.log('Received connection');
});

app.get('/api/paymentinfos', function(req, res) {
    res.send('List of paymentinfos');
    console.log('Received connection');
});

//SPECIFIC GET METHODS

app.get('/api/sellers/:id', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.get('/api/users/:id', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.get('/api/categories/:id', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.get('/api/categories/:category/products/:product', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.get('/api/users/:user/paymentinfos/:paymentinfo', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

//POST METHODS

app.post('/api/sellers', function(req, res) {

});

app.post('/api/users', function(req, res) {

});

app.post('/api/categories', function(req, res) {

});

app.post('/api/categories/:category/products', function(req, res) {

});

app.post('/api/categories/:category/products/:product/reviews', function(req, res) {

});

app.post('/api/paymentinfos', function(req, res) {

});

//DELETE METHODS

app.delete('/api/sellers/:seller', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.delete('/api/users/:user', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.delete('/api/categories/:category', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.delete('/api/categories/:category/products/:product', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.delete('/api/categories/:category/products/:product/reviews/:review', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.delete('/api/users/:user/paymentinfos/:paymentinfo', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

//EDIT METHODS (OVERWRITE)

app.put('/api/sellers/:seller', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.put('/api/users/:user', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.put('/api/categories/:category', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.put('/api/categories/:category/products/:product', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.put('/api/categories/:category/products/:product/reviews/:review', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.put('/api/users/:user/paymentinfos/:paymentinfo', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

//EDIT METHODS

app.patch('/api/sellers/:seller', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.patch('/api/users/:user', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.patch('/api/products/:product', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.patch('/api/categories/:category/products/:product', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.patch('/api/categories/:category/products/:product/reviews/:review', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.patch('/api/users/:user/paymentinfos/:paymentinfo', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});