var mongoose = require('mongoose');
var User = require('../models/user')

var schema = new mongoose.Schema({
    noteText: { type: String, required: true },
    noteLink: { type: String },
    noteTags: { type: String },
    noteAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

//Middleware toa automatically remove messages from the user object
schema.post('remove', function (note) {
    User.findById(note.noteAuthor, function (err, user) {
        user.notes.pull(note);
        user.save();
    });
});

module.exports = mongoose.model('Note', schema);