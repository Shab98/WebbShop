var express = require('express');
var router = express.Router();
var Product = require('../models/product');

var reviewsController = require('./reviews');

//Return a list of all the products
router.get('/', function(req, res, next) {
    var sorting = req.query.sort_by;
    var ordering = req.query.order_by;
    var mySort = null;

    if(sorting == "price") {
        if (ordering == "asc") {
            ordering = 1;
        }else if (ordering == "desc") {
            ordering = -1;
        }else{
            ordering = 1;
        }

        if (sorting == "price") {
            mySort = { price : ordering };
        }
    }
    
    Product.find(function(err, products) {
        if (err) return next(err);
        res.json({ "products" : products });
    }).sort(mySort);
});

//Delete all the products
router.delete('/', function(req, res, next) {
    var id = req.params.id;
    Product.remove({}, function(err,response) {
        if (err) { return next(err); }
        res.json(response);
    });
});

//Create a new product
router.post('/', function(req, res, next) {
    var product = new Product(req.body)
    product.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(product);
        console.log("DB: A Product has been added");
    })
});

//Return the product with the given id
router.get('/:id', function(req, res, next) {
    Product.findById(req.params.id, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        res.json({ "product" : product });
    });
});

//Delete the product with the given id
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Product.findOneAndDelete({ _id: id }, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        res.json(product);
    });
});

//Update the product with the given id
router.put('/:id', function(req, res, next) {
    Product.findById(req.params.id, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        product.reviews = req.body.reviews;
        product.save(function(err) {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
            }else{
                res.json(product);
            }
        });
    });
});

//Partially update the product with the given id
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Product.findById(id, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        product.name = (req.body.name || product.name);
        product.description = (req.body.description || product.description);
        product.price = (req.body.price || product.price);
        product.category = (req.body.category || product.category);
        product.save(function(err) {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
            }else{
                res.json(product);
            }
        });
    });
});

//Implement nested requests
router.use('/:id/reviews', function(req, res, next) {
    req.productId = req.params.id;
    next();
}, reviewsController);

module.exports = router;