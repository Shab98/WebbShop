var express = require('express');
var router = express.Router();
var Review = require('../models/review');

router.get('/:product/reviews', function(req, res) {

});

router.post('/:product/reviews', function(req, res, next) {
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

router.get('/:product/reviews/:id', function(req, res) {

});

router.delete('/:product/reviews/:id', function(req, res) {

});

router.put('/:product/reviews/:id', function(req, res) {

});

router.patch('/:product/reviews/:id', function(req, res) {

});

module.exports = router;