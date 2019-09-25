var express = require('express');
var router = express.Router();
var PaymentData = require('../models/paymentdata');
var User = require('../models/user');

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
        res.json(user.paymentDatas);
    });
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
            res.status(201).json(doc);
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
        let position = -1;
        for (let i = 0; i < user.paymentDatas.length; i++) {
            if (user.paymentDatas[i]._id == id) {
                position = i;
            }
        }
        if (position < 0){
            return res.status(404).json({ "message": "Paymentdata not found" });
        }
        res.json(user.paymentDatas[position]);
    });
    /*
    //Other implementation, couldnt do error handling here
    User.find({ '_id': userId, 'paymentDatas._id': id }, { 'paymentDatas.$': 1 }, function (err,myDoc) {
        if (err) { return next(err); }
        if (myDoc.length == 0){
            return res.status(404).json({ "message": "Paymentdata or user not found" });
        }
        res.json(myDoc[0].paymentDatas[0]);
    });*/
});

//Delete the review with the given id for a specific user
router.delete('/:id', function(req, res, next) {
    let userId = req.userId;
    let id = req.params.id;

    User.findByIdAndUpdate(userId, 
        { '$pull': { 'paymentDatas':{ '_id': id } }},{useFindAndModify : true}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        console.log(user);
        res.json(user);
    });
});

module.exports = router;