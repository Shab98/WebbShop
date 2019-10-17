var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Needed modules
var PaymentData = require('./paymentdata');

var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    paymentDatas: { type: [PaymentData.schema] }
});

module.exports = mongoose.model('users', userSchema);