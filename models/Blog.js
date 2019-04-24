const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Blogchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    img_href: {
        type: String
    },
    header: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    handle: {
        type: String
    },
    data: {
        type: String
    },
    tags: {
        type: String
    },
    time_reading: {
        type: Number
    },
    view_count: {
        type: Number
    },
    span_count:{
        type: Number
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Blog = mongoose.model('blog', Blogchema);
