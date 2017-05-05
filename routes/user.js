var express = require('express');
var bcryptjs = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/', function (req, res, next) {
    var newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailID: req.body.emailID,
        password: bcryptjs.hashSync(req.body.password, 10)
    });

    newUser.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                message: 'Error occured',
                error: err
            });
        }
        res.status(201).json({
            message: 'Data Saved',
            obj: result
        });
    });

});

router.post('/signin', function (req, res, next) {
    User.findOne({ emailID: req.body.emailID }, function (err, result) {
        if (err) {
            return res.status(500).json({
                message: 'Login failed',
                error: err
            });
        }
        if (!result) {
            return res.status(500).json({
                message: 'Error occured',
                error: { message: 'Invalid credentials' }
            });
        }

        if (!bcryptjs.compareSync(req.body.password, result.password)) {
            return res.status(401).json({
                message: 'Unauthorized user',
                error: { message: 'Invalid credentials' }
            });
        }
        var token = jwt.sign({ user: result }, 'SecretKey', { expiresIn: 7200 });
        res.status(200).json({
            message: 'User Logged in',
            obj: {
                message : 'Successfully logged in',
                token: token,
                userID: result._id
            }
        });

    });

});

module.exports = router;