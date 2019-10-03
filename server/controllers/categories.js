var express = require('express');
var router = express.Router();
var Category = require('../models/category');

//Return a list of all the categories
router.get('/', function(req, res, next) {
    Category.find(function(err, categories) {
        if (err) return next(err);
        res.json({ "categories" : categories });
    });
});

//Delete all the categories
router.delete('/', function(req, res, next) {
    var id = req.params.id;
    Category.remove({}, function(err,response) {
        if (err) { return next(err); }
        res.json(response);
    });
});

//Create a new category
router.post('/', function(req, res, next) {
    var category = new Category(req.body)
    category.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(category);
        console.log("DB: A Category has been added");
    });
});

//Return the category with the given id
router.get('/:id', function(req, res, next) {
    Category.findById(req.params.id, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        res.json(category);
    });
});

//Delete the category with the given id
router.delete('/:id', function(req, res, next) {
    Category.findOneAndDelete({ _id: req.params.id }, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        res.status(200).json(category);
    });
});

//Update the category with the given id
router.put('/:id', function(req, res, next) {
    Category.findById(req.params.id, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        category.name = req.body.name;
        category.save(function(err) {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
            }else{
                res.json(category);
            }
        });
    });
});

//Partially update the user with the given id
router.patch('/:id', function(req, res) {
    Category.findById(req.params.id, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        category.name = (req.body.name || category.name);
        category.save(function(err) {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
            }else{
                res.json(category);
            }
        });
    });
});

module.exports = router;