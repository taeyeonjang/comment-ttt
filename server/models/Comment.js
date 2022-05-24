const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({

    content:{
        type: String
    },
    like:{
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Comment }