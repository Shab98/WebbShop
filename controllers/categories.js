var express = require('express');
var router = express.Router();
var Category = require('../models/category');

router.get('/api/categories', function(req, res, next) {
    schema.Category.find(function(err, categories) {
        if (err) return next(err);
        res.json({ "categories": categories });
    });
});

router.get('/api/categories/:name', function(req, res, next) {
    var id = req.params.id;
    Category.findById(req.params.id, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        res.json(category);
    });

});

router.post('/api/categories', function(req, res, next) {
    var category = new schema.Category(req.body)
    category.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(category);
        console.log("DB: A Category has been added");
    })
});

router.delete('/api/categories/:name', function(req, res, next) {
    var id = req.params.id;
    Category.findOneAndDelete({ _name: name }, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        res.json(category);
    });
});

router.put('/api/categories/:name', function(req, res, next) {
    var name = req.params.name;
    Category.findById(name, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        category.name = req.body.name;
        category.save();
        res.json(category);
    });
});

router.patch('/api/categories/:name', function(req, res) {
    var id = req.params.id;
    Category.findById(id, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        category.name = (req.body.name || category.name);
    });
});

module.exports = router;