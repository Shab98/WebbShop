var express = require('express');
var router = express.Router();
var USer = require('../models/user');

router.get('/', function(req, res, next) {
    schema.User.find(function(err, users) {
        if (err) return next(err);
        res.json({ "users": users });
    });
});

router.post('/', function(req, res, next) {
    var user = new schema.User(req.body)
    user.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(user);
        console.log("DB: A User has been added");
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(user);
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({ _id: id }, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(user);
    });
});

router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.paymentDatas = req.body.paymentDatas;
        user.save();
        res.json(user);
    });
});

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
        user.save();
        res.json(user);
    });
});

module.exports = router;