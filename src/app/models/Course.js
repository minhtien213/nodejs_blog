const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator') //tự động tạo slug
const mongooseDelete = require('mongoose-delete') //tạp thùng rác khi xóa

const Course = new Schema({
    name: { type: String, required: true},
    description: { type: String},
    videoId: { type: String, required: true},
    image: { type: String},
    slug: { type: String, slug: ["name"], } // unique: true: tự động tạo slug khi đặt trùng name
}, {
    timestamps: true
});

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true,
})
module.exports = mongoose.model('Course', Course)