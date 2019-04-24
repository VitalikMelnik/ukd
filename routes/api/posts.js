const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const img_folder = require('../../img/main');

// Post model
const Post = require('../../models/Post');
// User model
const User = require('../../models/User');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/overflow');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
    Post.find().sort({date: -1}).skip(req.query.page * 8).limit(8)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});


// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({nopostfound: 'No post found with that ID'})
            }
        })
        .catch(err =>
            res.status(404).json({nopostfound: 'No post found with that ID'})
        );
});

// @route   POST api/posts
// @desc    Create post
// @access  Public
router.post('/', (req, res) => {
        const {errors, isValid} = validatePostInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        let newPost = {};

        if (req.body.anonymously) {
            newPost = new Post({
                text: req.body.text,
                name: 'Anonymous user',
                avatar: img_folder.img[1],
            });
        } else {
            newPost = new Post({
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.body.user,
            });
        }

        newPost.save().then(post => res.json(post));

    }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findById(req.user._id).then(user => {
        if (user.role === 'Admin') {
            Post.findById(req.params.id).then(post => {
                post.remove().then(() => res.json({success: true}));
            }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
        } else if (user.role === 'User' || user.role === 'Teacher') {
            Post.findById(req.params.id).then(post => {
                if (post.user.equals(req.user._id)) {
                    post.remove().then(() => res.json({success: true}));
                }
            }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
        } else {
            return res.status(401).json({notauthorized: 'User not authorized'});
        }
    });

});


// @route   POST api/posts/like && unlike/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            const obj = {
                id: req.user.id,
                _id: req.params.id
            };
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                for (let i = 0; i < post.likes.length; i++) {
                    if (post.likes[i].user + '' === req.user.id) {
                        post.likes.splice(i, 1);
                        obj.like = false;
                        break;
                    }
                }
            } else {
                obj.like = true;
                post.likes.unshift({user: req.user.id});

            }
            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({notauthorized: 'User not authorized'}));
    });
});


// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Public
router.post('/comment/:id', (req, res) => {
        const {errors, isValid} = validatePostInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Post.findById(req.params.id)
            .then(post => {
                let newComment = {};
                if (req.body.anonymously) {
                    newComment = {
                        text: req.body.text,
                        name: 'Anonymous user',
                        avatar: img_folder.img[1],
                    };
                } else {
                    newComment = {
                        text: req.body.text,
                        name: req.body.name,
                        avatar: req.body.avatar,
                        user: req.body.user
                    };
                }
                post.comments.unshift(newComment);
                post.save().then(post => res.json(post));
            }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
    }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
        User.findById(req.user._id).then(user => {
            if (user.role === 'Admin') {
                Post.findById(req.params.id).then(post => {
                    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                        return res.status(404).json({commentnotexists: 'Comment does not exist'});
                    }
                    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
                    post.comments.splice(removeIndex, 1);
                    post.save().then(post => res.json(post));
                }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
            } else if (user.role === 'User' || user.role === 'Teacher') {
                Post.findById(req.params.id).then(post => {
                        if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                            return res.status(404).json({commentnotexists: 'Comment does not exist'});
                        }
                        const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
                        if (post.comments[removeIndex].user.equals(req.user._id)) {
                            post.comments.splice(removeIndex, 1);
                            post.save().then(post => res.json(post));
                        }
                    }
                ).catch(err => res.status(404).json({postnotfound: 'No post found'}));
            } else {
                return res.status(401).json({notauthorized: 'User not authorized'});
            }
        });

    }
);

module.exports = router;
