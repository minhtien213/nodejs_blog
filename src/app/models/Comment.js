const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete') 
                //tạo thùng rác khi xóa(khi tạo mới document thì sẽ tự thêm deleted: false)
                //khi xóa mềm sẽ là deleted: true
                
const CommentSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    content: { type: String, require: true, },
    
    }, {
    timestamps: true // tự động thêm time tạo / sửa
})


// Add plugins
CommentSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true,
})
module.exports = mongoose.model('Comment', CommentSchema)