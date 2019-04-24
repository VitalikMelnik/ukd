const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    name: {
        type: String,
        required: true,
    },
    preview: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    credo: {
        type: String
    },
    bio: {
        type: String
    },
    color: {
        type: String
    },
    experience: [
        {
            name: {
                type: String,

            },
            info: {
                type: String,

            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
