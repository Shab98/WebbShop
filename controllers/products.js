var express = require('express');
var router = express.Router();
var Product = require('../models/product');

//Return a list of all the products
router.get('/api/products', function(req, res, next) {
    schema.Product.find(function(err, products) {
        if (err) return next(err);
        res.json({ "products": products });
    });
});

//Return the product with the given id
router.get('/api/products/:product', function(req, res, next) {
    var id = req.params.id;
    Product.findById(req.params.id, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        res.json(product);
    });

});

//Create a new product
router.post('/api/products', function(req, res, next) {
    var product = new schema.Product(req.body)

    product.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(product);
        console.log("DB: A Product has been added");
    })
});

//Delete the product with the given id
router.delete('/api/products/:id', function(req, res, next) {
    var id = req.params.id;
    Product.findOneAndDelete({ _id: id }, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        res.json(product);
    });
});


router.put('/api/products/:id', function(req, res, next) {
    var id = req.params.id;
    Product.findById(id, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        product.reviews = req.body.reviews;
        product.save();
        res.json(product);
    });
});

router.patch('/api/products/:id', function(req, res, next) {
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
        product.save();
        res.json(product);
    });
});

module.exports = router;