module.exports = function sortMiddlewares(req, res, next) {

    res.locals._sort = { //tạo object chứa các key để đẩy sang view
        enable : false,
        type: 'default'
    } //{{sortable 'name' _sort}} - biến _sort khi dùng trong view

    if(req.query.hasOwnProperty('_sort')) {
        Object.assign( res.locals._sort, {
            enable : true,
            type: req.query.type,
            column: req.query.column,
        })
    }

    next()
}