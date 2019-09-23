var express = require('express');
var router = express.Router();
var Review = require('../models/review');

router.get('/api/products/:product/reviews', function(req, res) {

});

router.get('/api/products/:product/reviews/:review', function(req, res) {

});

router.post('/api/products/:product/reviews', function(req, res, next) {
    var review = new schema.Review(req.body);

    productId = req.params.product;

    schema.Product.findOneAndUpdate(
        { id : productId },
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

router.delete('/api/products/:product/reviews/:review', function(req, res) {

});

router.put('/api/products/:product/reviews/:review', function(req, res) {

});

router.patch('/api/products/:product/reviews/:review', function(req, res) {

});

module.exports = router;