var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

mongoose.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);