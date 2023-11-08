const newRouter = require('./news'); //nạp router xuất ra từ file news.js
const siteRouter = require('./site'); //nạp router xuất ra từ file site.js

function routes(app) {
    app.use('/news', newRouter); //tạo tuyến đường chính đến news ( newsRouter - cấu hình thêm nhiều tuyến đường con của news )
    app.use('/search', siteRouter); //tạo tuyến đường chính đến news ( newsRouter - cấu hình thêm nhiều tuyến đường con của news )
    app.use('/', siteRouter); //tạo tuyến đường chính đến news ( newsRouter - cấu hình thêm nhiều tuyến đường con của news )
}

module.exports = routes;
