const newRouter = require('./news'); //nạp router xuất ra từ file news.js
const coursesRouter = require('./courses'); 
const meRouter = require('./me'); 
const siteRouter = require('./site');

function routes(app) {
    app.use('/news', newRouter); //tạo tuyến đường chính đến news ( newsRouter - cấu hình thêm nhiều tuyến đường con của news )
    app.use('/courses', coursesRouter); 
    app.use('/me', meRouter); 
    app.use('/search', siteRouter); 
    app.use('/', siteRouter); 
}

module.exports = routes;
