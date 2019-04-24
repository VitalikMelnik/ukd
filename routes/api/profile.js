const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const uniqid = require('uniqid');
// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');


// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

//Load images base64
const img_folder = require('../../img/main');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {};

        Profile.findOne({user: req.user.id})
            .populate('user')
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);


// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({profile: 'There are no profiles'}));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err =>
            res.status(404).json({profile: 'There is no profile for this user'})
        );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

        const {errors, isValid} = validateProfileInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        const profileFields = {};
        profileFields.user = req.user.id;
        profileFields.social = {};

        if (!req.body.preview) {
            profileFields.preview = img_folder.img[0];
        }

        for (const item in req.body) {
            if (req.body[item]) {
                if (item === 'youtube' || item === 'twitter' || item === 'facebook' || item === 'linkedin' || item === 'instagram') {
                    profileFields.social[item] = req.body[item];
                } else {
                    profileFields[item] = req.body[item];
                }
            }
        }
        Profile.findOne({user: req.user.id}).then(profile => {
            if (profile) {
                Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                ).then(profile => res.json(profile));

            } else {
                Profile.findOne({handle: profileFields.handle}).then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    } else {
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    }
                });
            }
        });
    }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
        const {errors, isValid} = validateExperienceInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({user: req.user.id}).then(profile => {
            const newExp = {
                name: req.body.name,
                info: req.body.info,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile));
        });
    }
);


// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({user: req.user.id})
            .then(profile => {
                const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
                profile.experience.splice(removeIndex, 1);
                profile.save().then(profile => res.json(profile));
            }).catch(err => res.status(404).json(err));
    }
);


// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
        Profile.findOneAndRemove({user: req.user.id}).then(() => {
            User.findOneAndRemove({_id: req.user.id}).then(() =>
                res.json({success: true})
            );
        });
    }
);

module.exports = router;
