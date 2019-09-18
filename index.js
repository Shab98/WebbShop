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

app.get('/api/users/:user/paymentdatas', function(req, res) {
    res.send('List of paymentdatas');
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

app.get('/api/users/:user/paymentdatas/:paymentdata', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});

//POST METHODS
//TODO: findAndUpdate fix the fact that validation is not done
app.post('/api/sellers', function(req, res, next) {
    var seller = new schema.Seller(req.body)

    seller.save(function(err){
        if(err)
            return next(err);
        else
            res.status(201).json(seller);
            console.log("DB: A Seller has been added");
    })
});

app.post('/api/users', function(req, res, next) {
    var user = new schema.User(req.body)
    user.save(function(err){
        if(err)
            return next(err);
        else
            res.status(201).json(user);
            console.log("DB: A User has been added");
    })
});

app.post('/api/categories', function(req, res, next) {
    var category = new schema.Category(req.body)
    category.save(function(err){
        if(err)
            return next(err);
        else
            res.status(201).json(category);
            console.log("DB: A Category has been added");
    })
});

app.post('/api/products', function(req, res, next) {
    var product = new schema.Product(req.body)

    product.save(function(err){
        if(err)
            return next(err);
        else
            res.status(201).json(product);
            console.log("DB: A Product has been added");
    })
});

app.post('/api/products/:product/reviews', function(req, res, next) {
    var review = new schema.Review(req.body);

    productId = req.params.product;

    schema.Product.findOneAndUpdate(
        { id : productId },
        { $push : { reviews : review } },
        { new : true, useFindAndModify : false },
        function(err,doc){
            if(err)
                return next(err);
            if(doc == null)
                return res.status(404).json("Product not found")
            res.status(201).json(doc);
        }
    );
});

app.post('/api/users/:user/paymentdatas', function(req, res, next) {
    var paymentData = new schema.PaymentData(req.body);

    user = req.params.user;

    schema.User.findOneAndUpdate(
        { id : user },
        { $push : { paymentDatas : paymentData } },
        { new : true, useFindAndModify : false },
        function(err,doc){
            if(err)
                return next(err);
            if(doc == null)
                return res.status(404).json("User not found")
            res.status(201).json(doc);
        }
    );
});

//DELETE METHODS

app.delete('/api/sellers/:seller', function(req, res) {
    var id = req.params.id;
    var seller = sellers[id];
    delete sellers[id];
    res.json(seller);
    console.log('Received connection');
});

app.delete('/api/users/:user', function(req, res) {
    var id = req.params.id;
    var user = users[id];
    delete users[id];
    res.json(user);
    console.log('Received connection');
});

app.delete('/api/categories/:category', function(req, res) {
    var id = req.params.id;
    var category = categories[id];
    delete categories[id];
    res.json(category);
    console.log('Received connection');
});

app.delete('/api/products/:product', function(req, res) {
    var id = req.params.id;
    var product = products[id];
    delete products[id];
    res.json(product);
    console.log('Received connection');
});

app.delete('/api/products/:product/reviews/:review', function(req, res) {
    var id = req.params.id;
    var review = reviews[id];
    delete reviews[id];
    res.json(review);
    console.log('Received connection');
});

app.delete('/api/users/:user/paymentdatas/:paymentdata', function(req, res) {
    var id = req.params.id;
    var paymentdata = paymentdatas[id];
    delete paymentdatas[id];
    res.json(paymentdata);
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

app.put('/api/users/:user/paymentdatas/:paymentdata', function(req, res) {
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

app.patch('/api/users/:user/paymentdatas/:paymentdata', function(req, res) {
    res.send(req.params.id);
    console.log('Received connection');
});
