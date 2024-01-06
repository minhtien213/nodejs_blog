const mongoose = require('mongoose')
const Schema = mongoose.Schema

                
const CommentSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    content: { type: String, require: true, },
    replys: [{
        account: { type: Schema.Types.ObjectId, ref: 'Account' },
        replyContent: { type: String, require: true, },
        addedAt: { type: String },
    }],
    addedAt: { type: String },
    })


// Add plugins

module.exports = mongoose.model('Comment', CommentSchema)