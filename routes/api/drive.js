const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const uploadImage = require('./functions/uploadImage');

// Models
const Drive = require('../../models/Drive');
const Profile = require('../../models/Profile');

// Validation
//const validatePostInput = require('../../validation/post');


//Test
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));


router.post('/save', passport.authenticate('jwt', {session: false}), (req, res) => {
    const driveFields = {
        folders: req.body.drive
    };
    Drive.findOne({user: req.user._id}).then(drive => {
            if (drive) {
                Drive.findOneAndUpdate(
                    {user: req.user._id},
                    {$set: driveFields},
                    {new: true}
                ).then(drive => res.json(drive));
            }
        }
    );
});

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
        const errors = {};
        Drive.findOne({user: req.user.id})
            .populate('user')
            .then(drive => {
                if (!drive) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.json(drive);
            })
            .catch(err => res.status(404).json(err));
    }
);


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Drive.findOne({handle: req.params.handle})
        .then(drive => {
            if (!drive) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            } else {
                res.json(drive);
            }
        })
        .catch(err => res.status(404).json(err));
});


// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
        let errors = {
            handle: ''
        };
        const driveFields = {
            user: req.user._id,
            handle: req.body.handle,
            folders: []
        };
        console.log(req.user);
        Drive.findOne({user: req.user._id}).then(drive => {
            if (drive) {
                Drive.findOneAndUpdate(
                    {user: req.user._id},
                    {$set: driveFields},
                    {new: true}
                ).then(drive => res.json(drive));

            } else {
                Drive.findOne({handle: driveFields.handle}).then(drive => {
                    if (drive) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    } else {
                        new Drive(driveFields).save().then(drive => res.json(drive));
                    }
                });
            }
        });
    }
);


module.exports = router;