var express = require('express');
var router = express.Router();
var Seller = require('../models/seller');
var Product = require('../models/product');
var getSellerPosition = require('../common/functions');


/*Return a list of all the sellers
router.get('/', function(req, res, next) {
    Seller.find(function(err, sellers) {
        if (err) return next(err);
        res.json({ "sellers": sellers });
    });
});*/
router.get('/', function(req, res, next) {
    let productId = req.productId;

    Product.findById(productId, function(err, product) {
        if (err) { return next(err); }
        if (product === null) {
            return res.status(404).json({ 'message': 'Product not found' });
        }
        if (product.sellers === null) {
            return res.status(404).json({ 'message': 'Seller not found' });
        }
        res.json({ "sellers": product.sellers });
    });
});

//Delete all the sellers
router.delete('/', function(req, res, next) {
    var id = req.params.id;
    Seller.remove({}, function(err, response) {
        if (err) { return next(err); }
        res.json(response);
    });
});

//Create a new seller
/*router.post('/', function(req, res, next) {
    var seller = new Seller(req.body);
    seller.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(seller);
        console.log("DB: A Seller has been added");
    });
});*/

router.post('/', function(req, res, next) {
    let productId = req.productId;
    var seller = new Seller(req.body);

    Product.findOneAndUpdate({ _id: productId }, { $push: { sellers: seller } }, { new: true, useFindAndModify: false },
        function(err, doc) {
            if (err)
                return next(err);
            if (doc == null)
                return res.status(404).json("Product not found")
            res.status(201).json(seller);
        }
    );
});

/*Return the seller with the given id
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findById(id, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        res.json(seller);
    });
});*/

router.get('/:id', function(req, res, next) {
    let productId = req.productId;
    let id = req.params.id;

    Product.findById(productId, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }

        //Manually searching in the array of reviews for the interested one
        let position = getSellerPosition(product.sellers, id);

        if (position < 0) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        res.json(product.sellers[position]);
    });
});

//Delete the seller with the given id
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findOneAndDelete({ _id: id }, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        res.json(seller);
    });
});

//Update the seller with the given id
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findById(id, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        seller.id = req.body.id;
        seller.name = req.body.name;
        seller.save(function(err) {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
            } else {
                res.json(seller);
            }
        });
    });
});

//Partially update the seller with the given id
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findById(id, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        seller.name = (req.body.name || seller.name);
        seller.save(function(err) {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
            } else {
                res.json(seller);
            }
        });
    });

});

module.exports = router;