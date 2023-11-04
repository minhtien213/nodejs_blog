// HTTP: (HyperText Transfer Protocol) - Giao thức truyền tải siêu văn bản
// SSR: server side rendering - mã html, css được render từ server side(phía máy chủ)
// CSR: client side rendering - mã html, css được render từ server side(phía máy khách)
// ExpressJS framework
// Thư viện Nodemon & Debug(sửa lỗi):
    // + Nodemon: restart lại trang khi file thay đổi( tự động lắng nghe sự thay đổi trong file)
    // + Tạo file nodemon.json để thay đổi đuôi file mà nodemon sẽ lắng nghe thay đổi trong file đó(vd: .scss, .json, .hbs, ...) để restart lại server
    // + Debug: đặt được break point để xem giá trị của biến, xem luồng code chạy...
// Thư viện Morgan: giúp xem được các log http request gửi lên node server
// Template engine (handlebars - thue viện Express handlebars): viết ra file chứa mã HTML ở file khác rồi liên kết lại(chia nhỏ layout:header, footer, body)
    // tạo các file xxx.handlebars để viết mã HTML (cấu hình lại đuôi .handlebars thành .hbs cho ngắn gọn)
        
        // + home.hbs: viết phần body
        // + các trang khác...
        // + Tạo thư mục layout chứa file main.hbs để chứa nội dung web( liên kết các file html nhỏ vào đây)
        // + Tạo thư mục partials chứa file layout nhỏ(header, footer) - các layout nhỏ không thay đổi khi load body
            // VD:
                // + main.hbs: layout trang web
                    // {{> header}} -- liên kết file header.hbs
                    // <div class="container">
                    //     {{{body}}} - liên kết file body chứa nội dung chi tiết (vd: home.hbs, news.hbs...)
                    // </div>
                    // {{> footer}} - liên kết file footer.hbs
// Static file & SCSS:
    // Static file: file tĩnh, xem được file ảnh theo đường dẫn(path) trên trình duyệt
    // SCSS: tạo file app.scss để viết css, sau đó sẽ tự đồng bộ sang file app.css
        // Tạo file _variables.scss để tạo biến dùng lại nhiều lần


// file package.json để khai báo các key, các phụ thuộc
// file app.scss để viết css, sau đó sẽ tự đồng bộ sang file app.css
// file _variables.scss để tạo biến dùng lại nhiều lần
// file nodemon.json để thay đổi đuôi file mà nodemon sẽ lắng nghe thay đổi trong file đó(vd: .scss, .json, .hbs, ...) để restart lại server
// thư mục src lưu all source code
// thư mục resources/views chứa các file layout để render ra view của app nodejs
// cài scss giúp viết css nhanh hơn(tự đồng bộ các file liên quan đến css sau khi viết)

// CÁCH CHẠY APP (PROJECT):
    // chạy lệnh: npm start - để khởi động web server nodejs
    // chạy lệnh: npm run watch - để lắng nghe sự thay đổi của file scss