var express = require('express');
var router = express.Router();
var Seller = require('../models/seller');

router.get('/api/sellers', function(req, res, next) {
    schema.Seller.find(function(err, sellers) {
        if (err) return next(err);
        res.json({ "sellers": sellers });
    });
});

router.get('/api/sellers/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findById(req.params.id, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        res.json(seller);
    });

});

router.post('/api/sellers', function(req, res, next) {
    var seller = new schema.Seller(req.body)

    seller.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(seller);
        console.log("DB: A Seller has been added");
    })
});

router.delete('/api/sellers/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findOneAndDelete({ _id: id }, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        res.json(seller);
    });
});


router.put('/api/sellers/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        seller.name = req.body.name;
        seller.save();
        res.json(seller);
    });
});

router.patch('/api/sellers/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findById(id, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        seller.name = (req.body.name || seller.name);
        seller.save();
        res.json(seller);
    });

});

module.exports = router;