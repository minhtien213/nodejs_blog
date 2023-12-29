const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete') 
                //tạo thùng rác khi xóa(khi tạo mới document thì sẽ tự thêm deleted: false)
                //khi xóa mềm sẽ là deleted: true
                
const CommentSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    content: { type: String, require: true, },
    addedAt: { type: String },
    })


// Add plugins
CommentSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true,
})
module.exports = mongoose.model('Comment', CommentSchema)