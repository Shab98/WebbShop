var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Review = require('../models/review');

//Return a list of all the reviews of a specific product
router.get('/', function(req, res, next) {
    let productId = req.productId;

    product.findById(productId, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        if (product.reviews == null) {
            return res.status(404).json({ "message": "Reviews not found" });
        }
        res.json(product.reviews);
    });
});

//Create a new review for a specific product
router.post('/', function(req, res, next) {
    let productId = req.productId;
    var review = new Review(req.body);

    Product.findOneAndUpdate(
        { _id : productId },
        { $push : { reviews : review } },
        { new : true, useFindAndModify : false },
        function(err,doc){
            if(err)
                return next(err);
            if (doc == null)
                return res.status(404).json("Product not found")
            res.status(201).json(doc);
        }
    );
});

//Return the review with the given id for a specific product
router.get('/:id', function(req, res, next) {
    let productId = req.productId;
    let id = req.params.id;
    
    Product.findById(productId, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }

        //Manually searching in the array of reviews for the interested one
        let position = -1;
        for (let i = 0; i < product.reviews.length; i++) {
            if (product.reviews[i]._id == id) {
                position = i;
            }
        }
        if (position < 0){
            return res.status(404).json({ "message": "Review not found" });
        }
        res.json(product.reviews[position]);
    });
});

//Delete the review with the given id for a specific product
router.delete('/:id', function(req, res, next) {
    let productId = req.productId;
    let id = req.params.id;

    product.findByIdAndUpdate(productId, 
        { '$pull': { 'reviews':{ '_id': id } }},{useFindAndModify : true}, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        console.log(product);
        res.json(product);
    });
});


module.exports = router;