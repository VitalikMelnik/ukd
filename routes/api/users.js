const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const generator = require('generate-password');
const passport = require('passport');


// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateRestorePass = require('../../validation/restore-password');


//emails config
const sent_email = require('../../emails/template');

// Load User model
const User = require('../../models/User');
const Password = require('../../models/Password');


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users Works'}));


// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    let role;
    if (req.body.role === '1') {
        if (req.body.role_password === 'teacher12345') {
            role = 'Teacher'
        } else {
            errors.role_password = 'password is incorrect';
            return res.status(400).json(errors);
        }
    } else if (req.body.role === '2') {
        if (req.body.role_password === 'admin12345') {
            role = 'Admin'
        } else {
            errors.role_password = 'password is incorrect';
            return res.status(400).json(errors);
        }
    } else {
        role = 'User'
    }

    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {

            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                role: role
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
            sent_email('register', req.body.email, 'Thanks for you register');
        }
    });
});


// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {id: user.id, role: user.role, email: user.email};
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 3600},
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        });
    });
});


// @route   Post api/users/restore_password
// @desc    Return link for restoring password
// @access  Public
router.post('/restore_password', function (req, res) {
    const {errors, isValid} = validateRestorePass(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const generate_link = generator.generate({
        uppercase: true,
        length: 20,
        numbers: true,
    });

    User.findOne({email: req.body.email}).then(user => {
        if (!user) {
            errors.all = 'User not found';
            return res.status(404).json(errors);
        } else {
            Password.findOne({email: req.body.email}).then(password => {
                if (password) {
                    errors.all = 'You sent your request earlier, check your email!';
                    return res.status(404).json(errors);
                } else {
                    let newPasswordRestore = new Password({
                        email: req.body.email,
                        link: generate_link,
                    });

                    newPasswordRestore.save().then(password => res.json(password));
                    const finish_link = 'http://localhost:3000/restore_password/' + generate_link;
                    sent_email('restore_password', req.body.email, 'Your restore password', finish_link);
                }
            });
        }
    });
});


// @route   Delete api/users/restore_password
// @desc    Return new passwor
// @access  Public
router.delete('/restore_password/:id', function (req, res) {
    Password.findOne({link: req.params.id}).then(password => {
        if (password) {
            User.findOne({email: password.email}).then(user => {
                const generate_password = generator.generate({
                    uppercase: false,
                    length: 10,
                    numbers: true,
                });
                bcrypt.hash(generate_password, 10, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(password.remove().then(() => res.json({success: true})))
                        .catch(err => console.log(err));
                });

                sent_email('restore_password_finish', user.email, 'Your restore password', generate_password);
            })
        } else {
            return res.status(200).json({success: true});
        }
    });
});


// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({
            id: req.user.id,
            role: req.user.role,
            email: req.user.email
        });
    }
);

module.exports = router;
