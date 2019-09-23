var express = require('express');
var router = express.Router();
var PaymentData = require('../models/paymentdata');


router.get('/:user/paymentdatas', function(req, res) {
    res.send('List of paymentdatas');
    console.log('Received connection');
});

router.post('/:user/paymentdatas', function(req, res, next) {
    var paymentData = new schema.PaymentData(req.body);

    user = req.params.user;

    schema.User.findOneAndUpdate(
        { id : user },
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

router.get('/:user/paymentdatas/:id', function(req, res) {

});

router.delete('/:user/paymentdatas/:id', function(req, res) {

});

router.put('/:user/paymentdatas/:id', function(req, res) {

});

router.patch('/:user/paymentdatas/:id', function(req, res) {

});

module.exports = router;