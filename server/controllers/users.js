var express = require('express');
var router = express.Router();
var User = require('../models/user');

var paymentdatasController = require('./paymentdatas');

//Return a list of all the users
router.get('/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) return next(err);
        res.json( users );
    });
});

//Create a new user
router.post('/', function(req, res, next) {
    var user = new User(req.body)
    user.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(user);
        console.log("DB: A User has been added");
    });
});

//Return the user with the given id
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(user);
    });
});

//Delete the user with the given id
router.delete('/:id', function(req, res, next) {
    User.findOneAndDelete({ _id: req.params.id }, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(user);
    });
});

//Update the user with the given id
router.put('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.paymentDatas = req.body.paymentDatas;
        user.save(function(err) {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
            }else{
                res.json(user);
            }
        });
    });
});

//Partially update the user with the given id
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        user.firstName = (req.body.firstName || user.firstName);
        user.lastName = (req.body.lastName || user.lastName);
        user.email = (req.body.email || user.email);
        user.password = (req.body.password || user.password);
        user.save(function(err) {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
            }else{
                res.json(user);
            }
        });
    });
});

//Implement nested requests
router.use('/:id/paymentdatas', function(req, res, next) {
    req.userId = req.params.id;
    next();
}, paymentdatasController);

module.exports = router;