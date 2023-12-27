const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const slug = require('mongoose-slug-generator') //tự động tạo slug
const slug = require('mongoose-slug-updater') //tự động tạo slug
const mongooseDelete = require('mongoose-delete') 
                //tạo thùng rác khi xóa(khi tạo mới document thì sẽ tự thêm deleted: false)
                //khi xóa mềm sẽ là deleted: true

const AccountSchema = new Schema({
    username: { type: String, required: true,  unique: true },
    password: { type: String, required: true},
    name: { type: String, required: true},
    cart: [{
        courses: { type: Schema.Types.ObjectId, ref: 'Course' },
        // quantity: { type: Number},
        addedAt: { type: String },
      }], 
    image: { type: String},
    role: { type: Number, default: 1 },
    slug: { type: String, slug: "name"}
}, {
    timestamps: true // tự động thêm time tạo / sửa
})


// Add plugins
mongoose.plugin(slug)
AccountSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true,
})
module.exports = mongoose.model('Account', AccountSchema)