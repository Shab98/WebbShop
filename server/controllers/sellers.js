var express = require('express');
var router = express.Router();
var Seller = require('../models/seller');

//Return a list of all the sellers
router.get('/', function(req, res, next) {
    Seller.find(function(err, sellers) {
        if (err) return next(err);
        res.json( sellers );
    });
});

//Create a new seller
router.post('/', function(req, res, next) {
    var seller = new Seller(req.body);
    seller.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(seller);
        console.log("DB: A Seller has been added");
    });
});

//Return the seller with the given id
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findById(id, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        res.json(seller);
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
            }else{
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
            }else{
                res.json(seller);
            }
        });
    });

});

module.exports = router;