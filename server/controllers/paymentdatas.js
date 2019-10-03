var express = require('express');
var router = express.Router();
var PaymentData = require('../models/paymentdata');
var User = require('../models/user');
var getPaymentdataPosition = require('../common/functions');

//Return a list of all the paymentdatas of a specific user
router.get('/', function(req, res, next) {
    let userId = req.userId;

    User.findById(userId, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        if (user.paymentDatas == null) {
            return res.status(404).json({ "message": "Paymentdatas not found" });
        }
        res.json({ "paymentDatas" : user.paymentDatas });
    });
});

//Delete all the paymentdatas
router.delete('/', function(req, res, next) {
    let userId = req.userId;
    User.findOneAndUpdate(
        { _id : userId },
        { $set : { paymentDatas : [] } },
        function(err,doc){
            if(err) { return next(err); }
            res.status(201).json(doc.paymentDatas);
        }
    );
});

//Create a new paymentdata for a specific user
router.post('/', function(req, res, next) {
    let userId = req.userId;
    var paymentData = new PaymentData(req.body);

    User.findOneAndUpdate(
        { _id : userId },
        { $push : { paymentDatas : paymentData } },
        { new : true, useFindAndModify : false },
        function(err,doc){
            if(err)
                return next(err);
            if (doc == null)
                return res.status(404).json("User not found")
            res.status(201).json(paymentData);
        }
    );
});

//Return the paymentdata with the given id for a specific user
router.get('/:id', function(req, res, next) {
    let userId = req.userId;
    let id = req.params.id;
    
    User.findById(userId, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }

        //Manually searching in the array of PaymentDatas for the interested one
        let position = getPaymentdataPosition(user.paymentDatas, id);
        
        if (position < 0){
            return res.status(404).json({ "message": "Paymentdata not found" });
        }
        res.json(user.paymentDatas[position]);
    });
});

//Delete the paymentdata with the given id for a specific user
router.delete('/:id', function(req, res, next) {
    let userId = req.userId;
    let id = req.params.id;
    User.findById(userId, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        let position = getPaymentdataPosition(user.paymentDatas, id);
        if (position < 0) {
            return res.status(404).json({ "message": "Paymentdata not found" });
        }
        removed = user.paymentDatas.splice(position);
        
        user.save(function(err) {
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