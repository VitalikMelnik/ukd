const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriveSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true
    },
    folders: [
        {
            name: {
                type: String,
                required: true
            },
            folder: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    link: {
                        type: String
                    },
                    type: {
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
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Drive = mongoose.model('drive', DriveSchema);
