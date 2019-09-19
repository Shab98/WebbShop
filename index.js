const express = require('express');
const app = express();
const schema = require('./db');


//Remember to access the schema with schema.<schema_name>
//For example:
//schema.User

app.use(express.json());

//GET METHODS

app.get('/', function(req, res) {
    res.send('Hello :)');
    console.log('Received connection');
});

app.get('/api/sellers', function(req, res, next) {
    schema.Seller.find(function(err, sellers) {
        if (err) return next(err);
        res.json({ "sellers": sellers });
    });
});

app.get('/api/users', function(req, res, next) {
    schema.User.find(function(err, users) {
        if (err) return next(err);
        res.json({ "users": users });
    });
});

app.get('/api/products', function(req, res, next) {
    schema.Product.find(function(err, products) {
        if (err) return next(err);
        res.json({ "products": products });
    });
});

app.get('/api/products/:product/reviews', function(req, res) {

});

app.get('/api/categories', function(req, res, next) {
    schema.Category.find(function(err, categories) {
        if (err) return next(err);
        res.json({ "categories": categories });
    });
});

app.get('/api/users/:user/paymentdatas', function(req, res) {
    res.send('List of paymentdatas');
    console.log('Received connection');
});

//SPECIFIC GET METHODS

app.get('/api/sellers/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findById(req.params.id, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        res.json(seller);
    });

});

app.get('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(user);
    });

});

app.get('/api/categories/:name', function(req, res, next) {
    var id = req.params.id;
    Category.findById(req.params.id, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        res.json(category);
    });

});

app.get('/api/products/:product', function(req, res, next) {
    var id = req.params.id;
    Product.findById(req.params.id, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        res.json(product);
    });

});

app.get('/api/products/:product/reviews/:review', function(req, res) {

});

app.get('/api/users/:user/paymentdatas/:paymentdata', function(req, res) {

});

//POST METHODS
//TODO: findAndUpdate fix the fact that validation is not done
app.post('/api/sellers', function(req, res, next) {
    var seller = new schema.Seller(req.body)

    seller.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(seller);
        console.log("DB: A Seller has been added");
    })
});

app.post('/api/users', function(req, res, next) {
    var user = new schema.User(req.body)
    user.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(user);
        console.log("DB: A User has been added");
    })
});

app.post('/api/categories', function(req, res, next) {
    var category = new schema.Category(req.body)
    category.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(category);
        console.log("DB: A Category has been added");
    })
});

app.post('/api/products', function(req, res, next) {
    var product = new schema.Product(req.body)

    product.save(function(err) {
        if (err)
            return next(err);
        else
            res.status(201).json(product);
        console.log("DB: A Product has been added");
    })
});

app.post('/api/products/:product/reviews', function(req, res, next) {
    var review = new schema.Review(req.body);

    productId = req.params.product;

    schema.Product.findOneAndUpdate({ id: productId }, { $push: { reviews: review } }, { new: true, useFindAndModify: false },
        function(err, doc) {
            if (err)
                return next(err);
            if (doc == null)
                return res.status(404).json("Product not found")
            res.status(201).json(doc);
        }
    );
});

app.post('/api/users/:user/paymentdatas', function(req, res, next) {
    var paymentData = new schema.PaymentData(req.body);

    user = req.params.user;

    schema.User.findOneAndUpdate({ id: user }, { $push: { paymentDatas: paymentData } }, { new: true, useFindAndModify: false },
        function(err, doc) {
            if (err)
                return next(err);
            if (doc == null)
                return res.status(404).json("User not found")
            res.status(201).json(doc);
        }
    );
});

//DELETE METHODS

app.delete('/api/sellers/:id', function(req, res, next) {
    var id = req.params.id;
    Seller.findOneAndDelete({ _id: id }, function(err, seller) {
        if (err) { return next(err); }
        if (seller == null) {
            return res.status(404).json({ "message": "Seller not found" });
        }
        res.json(seller);
    });
});

app.delete('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({ _id: id }, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.json(user);
    });
});

app.delete('/api/categories/:name', function(req, res, next) {
    var id = req.params.id;
    Category.findOneAndDelete({ _name: name }, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        res.json(category);
    });
});

app.delete('/api/products/:id', function(req, res, next) {
    var id = req.params.id;
    Product.findOneAndDelete({ _id: id }, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        res.json(product);
    });
});

app.delete('/api/products/:product/reviews/:review', function(req, res) {

});

app.delete('/api/users/:user/paymentdatas/:paymentdata', function(req, res) {

});

//EDIT METHODS (OVERWRITE)

app.put('/api/sellers/:id', function(req, res, next) {
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

app.put('/api/users/:id', function(req, res, next) {
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

app.put('/api/categories/:name', function(req, res, next) {
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

app.put('/api/products/:id', function(req, res, next) {
    var id = req.params.id;
    Product.findById(id, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        product.reviews = req.body.reviews;
        product.save();
        res.json(product);
    });
});

app.put('/api/products/:product/reviews/:review', function(req, res) {

});

app.put('/api/users/:user/paymentdatas/:paymentdata', function(req, res) {

});

//EDIT METHODS

app.patch('/api/sellers/:id', function(req, res, next) {
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

app.patch('/api/users/:id', function(req, res, next) {
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

app.patch('/api/categories/:name', function(req, res) {
    var id = req.params.id;
    Category.findById(id, function(err, category) {
        if (err) { return next(err); }
        if (category == null) {
            return res.status(404).json({ "message": "Category not found" });
        }
        category.name = (req.body.name || category.name);
    });
});

app.patch('/api/products/:id', function(req, res, next) {
    var id = req.params.id;
    Product.findById(id, function(err, product) {
        if (err) { return next(err); }
        if (product == null) {
            return res.status(404).json({ "message": "Product not found" });
        }
        product.name = (req.body.name || product.name);
        product.description = (req.body.description || product.description);
        product.price = (req.body.price || product.price);
        product.category = (req.body.category || product.category);
        product.save();
        res.json(product);
    });
});

app.patch('/api/products/:product/reviews/:review', function(req, res) {

});

app.patch('/api/users/:user/paymentdatas/:paymentdata', function(req, res) {

});

//Error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        "message": err.message,
        "error": {}
    };
    if (app.get('env') === 'development') {
        err_res["error"] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(3001, function() {
    console.log('App is listening on port 3000');
});