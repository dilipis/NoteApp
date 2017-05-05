var express = require('express');
var Notes = require('../models/notes');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

var router = express.Router();

//On loading the main notes page. Shows all the notes entered by all users. Need not be logged in
router.get('/', function (req, res, next) {
    Notes.find()
        .populate('noteAuthor', 'firstName')
        .exec(function (err, note) {
            if (err) {
                return res.status(500).json({
                    message: 'Error occured',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Data Fetched',
                obj: note
            });
        });
});

// Middleware to block other user actions on the notes route based on the web token. Only logged in users can access the routes below this
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'SecretKey', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                message: 'Not authenticated',
                error: err
            });
        }
        next();
    });
});

router.post('/', function (req, res, next) {

    //Decode and extract the user object from the token and retriev the details from the database
    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'Not authenticated',
                error: err
            });
        }
        // Transform notes model into mongo model
        var note = new Notes({
            noteText: req.body.noteText,
            noteAuthor: user,
            noteLink: req.body.noteLink,
            noteTags: req.body.noteTags
        });

        // Save the note object to DB
        note.save((error, savedNote) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error occured',
                    error: error
                });
            }
            //Update the note user relationship
            user.notes.push(note);
            user.save();
            res.status(201).json({
                message: 'Data Saved',
                obj: savedNote
            });
        });

    });
});

router.patch('/:id', function (req, res, next) {
    // Get the decoded token
    var decoded = jwt.decode(req.query.token);

    Notes.findById(req.params.id, function (err, note) {
        if (err) {
            return res.status(500).json({
                message: 'Error occured while fetching notes',
                error: err
            });
        }
        // Check for case where no such note exists in the DB
        if (!note) {
            return res.status(500).json({
                message: 'No such note found in the database',
                error: err
            });
        }
        if (note.noteAuthor != decoded.user._id) {
            return res.status(401).json({
                message: 'Invalid credentials',
                error: { message: 'User who created the note is different!'}
            });
        }
        //If no error, update the note attributes
        note.noteText = req.body.noteText;
        note.noteLink = req.body.noteLink;
        note.noteTags = req.body.noteTags;

        note.save((error, note) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error occured',
                    error: error
                });
            }
            res.status(201).json({
                message: 'Data Saved',
                obj: note
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    // Get the decoded token
    var decoded = jwt.decode(req.query.token);

    Notes.findById(req.params.id, function (err, note) {
        if (err) {
            return res.status(500).json({
                message: 'Error occured while fetching notes',
                error: err
            });
        }
        // Check for case where no such note exists in the DB
        if (!note) {
            return res.status(500).json({
                message: 'No such note found in the database',
                error: err
            });
        }
        if (note.noteAuthor != decoded.user._id) {
            return res.status(401).json({
                message: 'Invalid credentials',
                error: { message: 'User who created the note is different!' }
            });
        }

        note.remove((error, note) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error occured',
                    error: error
                });
            }
            res.status(201).json({
                message: 'Note removed',
                obj: note
            });
        });
    });
});

module.exports = router;