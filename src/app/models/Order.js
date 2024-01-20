const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const slug = require('mongoose-slug-generator') //tự động tạo slug
const slug = require('mongoose-slug-updater') //tự động tạo slugconst 
mongooseDelete = require('mongoose-delete') 
                //tạo thùng rác khi xóa(khi tạo mới document thì sẽ tự thêm deleted: false)
                //khi xóa mềm sẽ là deleted: true
                
const OrderSchema = new Schema({
    orderCode: { type: String, require: true},
    orderProducts: [{ 
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, require: true, },
     }],
    totalPrice: { type: Number, required: true, },
    discount: { type: String, default: '', },
    orderStatus: { type: String, default: 'successed', },
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    address: { type: String, required: true, },
    phone: { type: String, required: true, },
    email: { type: String, default: '', },
    addedAt: { type: String },
})


//custom query helpers
    //tạo phương thức sort 
    OrderSchema.query.sortable = function(req){
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
OrderSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true,
})
module.exports = mongoose.model('Order', OrderSchema)