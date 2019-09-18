const express = require('express');
const app = express();
const schema = require('./db');


//Remember to access the schema with schema.<schema_name>
//For example:
//schema.User

app.use(express.json());

app.listen(3001, function() {
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

app.get('/api/products/:product/reviews', function(req, res) {
    res.send('List of reviews');
    console.log('Received connection');
});

app.get('/api/categories', function(req, res) {
    res.send('List of sellers');
    console.log('Received connection');
});

app.get('/api/users/:user/paymentinfos', function(req, res) {
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

app.get('/api/products/:product', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.get('/api/products/:product/reviews/:review', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.get('/api/users/:user/paymentinfos/:paymentinfo', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

//POST METHODS

app.post('/api/sellers', function(req, res) {
    var seller = new schema.Seller(req.body)
    seller.save(function(err){
        if(err)
            return next(err);
        else
            res.status(201).json(seller);
    })
});

app.post('/api/users', function(req, res) {
    var user = new schema.User(req.body)
    user.save(function(err){
        if(err)
            return next(err);
        else
            res.status(201).json(user);
    })
});

app.post('/api/categories', function(req, res) {
    var category = new schema.Category(req.body)
    category.save(function(err){
        if(err)
            return next(err);
        else
            res.status(201).json(category);
    })
});

app.post('/api/products', function(req, res) {

});

app.post('/api/products/:product/reviews', function(req, res) {

});

app.post('/api/users/:user/paymentinfos', function(req, res) {

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

app.delete('/api/products/:product', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.delete('/api/products/:product/reviews/:review', function(req, res) {
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

app.put('/api/products/:product', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.put('/api/products/:product/reviews/:review', function(req, res) {
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

app.patch('/api/categories/:category', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.patch('/api/products/:product', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.patch('/api/products/:product/reviews/:review', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

app.patch('/api/users/:user/paymentinfos/:paymentinfo', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});