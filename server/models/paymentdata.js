var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentDataSchema = new Schema({
    nameOnCard: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    cvv: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true }
});

module.exports = mongoose.model('paymentdatas', paymentDataSchema);