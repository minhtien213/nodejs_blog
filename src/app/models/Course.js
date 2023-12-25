const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const slug = require('mongoose-slug-generator') //tự động tạo slug
const slug = require('mongoose-slug-updater') //tự động tạo slug
const mongooseDelete = require('mongoose-delete') 
                //tạo thùng rác khi xóa(khi tạo mới document thì sẽ tự thêm deleted: false)
                //khi xóa mềm sẽ là deleted: true
                
const CourseSchema = new Schema({
    name: { type: String, require: true},
    description: { type: String},
    images: [{ type: String, required: true }],
    slug: { type: String, slug: "name", unique: true } // unique: true: tự động tạo slug khi đặt trùng name
}, {
    timestamps: true // tự động thêm time tạo / sửa
})


//custom query helpers
    //tạo phương thức sort 
    CourseSchema.query.sortable = function(req){
        //check url nếu có _sort thì sắp xếp lại data trước khi render
        if(req.query.hasOwnProperty('_sort')){
            const isValidType = ['asc', 'desc'].includes(req.query.type) //ngăn người dùng cố tình nhập type khác trên URL
            return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
            })
        }
        return this
    }


// Add plugins
mongoose.plugin(slug)
CourseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true,
})
module.exports = mongoose.model('Course', CourseSchema)