const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const uploadImage = require('./functions/uploadImage');

// Models
const Blog = require('../../models/Blog');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Validation
const validatePostInput = require('../../validation/post');


//Test
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));

// @route   POST api/blog
// @desc    Create post page
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
        const {errors, isValid} = validatePostInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        let err;
        if (req.body.tags) {
            if (req.body.tags.length < 3) {
                err = {tag: 'Must have 3 tags'};
                return res.status(400).json(err);
            } else if (req.body.tags.length > 8) {
                err = {tag: 'Must have 3 tags'};
                return res.status(400).json(err);
            } else if (req.body.tags) {
                for (let j = 0; j < req.body.tags.length; j++) {
                    if (req.body.tags[j].length < 2 || req.body.tags[j].length > 10) {
                        err = {tag: 'Tags length needs to between 2 and 10 characters'};
                        return res.status(400).json(err);
                    }
                }
            }
        }
        Profile.findOne({user: req.user.id}).then(profile => {
            const newPost = new Blog({
                user: req.user.id,
                name: profile.name,
                img_href: req.body.img_href ? req.body.img_href : "http://www.saintpaul.ind.br/assets/img/blog/img-blog-4.jpg",
                header: req.body.header,
                avatar: profile.preview,
                handle: profile.handle,
                time_reading: Math.ceil(req.body.data.length / 900),
                tags: req.body.tags,
                data: req.body.data,
                view_count: 0,
                span_count: 0
            });
            newPost.save().then(blog => res.json(blog));
        });
    }
);

// @route   DELETE api/идщп/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findById(req.user.id).then(user => {
        if (user.role === 'Admin') {
            Blog.findById(req.params.id).then(post => {
                post.remove().then(() => res.json({success: true}));
            }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
        } else if (user.role === 'User' || user.role === 'Teacher') {
            Blog.findById(req.params.id).then(post => {
                if (post.user.equals(req.user.id)) {
                    post.remove().then(() => res.json({success: true}));
                }
            }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
        } else {
            return res.status(401).json({notauthorized: 'User not authorized'});
        }
    });

});

// @route   BLOG api/blog/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
        Profile.findOne({user: req.user.id}).then(profile => {
            Blog.findById(req.params.id)
                .then(post => {
                    const obj = {
                        id: req.user.id,
                        _id: req.params.id
                    };
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        // post.likes = post.likes.filter(function( item ) {
                        //     return item.id !== req.user.id;
                        // });
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
                })
                .catch(err => res.status(404).json({postnotfound: 'No post found'}));
        });
    }
);

//
// router.post('/span/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
//     Blog.findById(req.params.id)
//         .then(post => {
//             if (post.span_count === 1) {
//                 const obj = {
//                     header: post.header,
//                     span: true
//                 };
//                 post.delete().then(post => res.json(obj));
//             } else {
//                 post.span_count++;
//                 const obj = {
//                     header: post.header,
//                     span: true
//                 };
//                 post.save().then(post => res.json(obj));
//             }
//         })
//         .catch(err => res.status(404).json({postnotfound: 'No post found'}));
// });

router.get('/', (req, res) => {
    Blog.find().sort({date: -1}).skip(req.query.page * 8).limit(8)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});


router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(post => {
            if (post) {
                post.view_count++;
                post.save().then(post => res.json(post));
            } else {
                res.status(404).json({nopostfound: 'No post found with that ID'})
            }
        })
        .catch(err =>
            res.status(404).json({nopostfound: 'No post found with that ID'})
        );
});

router.post('/images', passport.authenticate('jwt', {session: false}), (req, res) => {
    uploadImage(req, res).then(result => res.send({
        status: 'success',
        msg: 'Image Uploaded!',
        result
    })).catch(([msg, err]) => {
        res.status(500).send(msg)
    })
});


module.exports = router;


