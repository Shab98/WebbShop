var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Review = require('../models/review');
var getReviewPosition = require('../common/functions');

//Return a list of all the reviews of a specific product
router.get('/', function(req, res, next) {
    let productId = req.productId;

    Product.findById(productId, function(err, product) {
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

//Delete all the reviews
router.delete('/', function(req, res, next) {
    let productId = req.productId;
    Product.findOneAndUpdate(
        { _id : productId },
        { $set : { reviews : [] } },
        function(err,doc){
            if(err) { return next(err); }
            res.status(201).json(doc.reviews);
        }
    );
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
            res.status(201).json(review);
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
        let position = getReviewPosition(product.reviews, id);
        
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
    Product.findById(productId, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        let position = getReviewPosition(product.reviews, id);
        if (position < 0) {
            return res.status(404).json({ "message": "Review not found" });
        }
        removed = product.reviews.splice(position);
        
        product.save(function(err) {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
            }else{
                res.json(removed[0]);
            }
        });
    });
});



module.exports = router;