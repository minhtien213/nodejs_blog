// HTTP: (HyperText Transfer Protocol) - Giao thức truyền tải siêu văn bản
// SSR: server side rendering - mã html, css được render từ server side(phía máy chủ)
// CSR: client side rendering - mã html, css được render từ server side(phía máy khách)
// ExpressJS framework
// Thư viện Nodemon & Debug(sửa lỗi - icon nodejs màu xanh ở devtools):
    // + Nodemon: restart lại trang khi file thay đổi( tự động lắng nghe sự thay đổi trong file)
    // + Tạo file nodemon.json để thay đổi đuôi file mà nodemon sẽ lắng nghe thay đổi trong file đó(vd: .scss, .json, .hbs, ...) để restart lại server
    // + Debug: đặt được break point để xem giá trị của biến, xem luồng code chạy...

// Thư viện Morgan: giúp xem được các log http request gửi lên node server

// Template engine (handlebars - thư viện Express handlebars): viết ra file chứa mã HTML ở file khác rồi liên kết lại(chia nhỏ layout:header, footer, body)
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
    // chạy lệnh: npm start - để khởi động web server nodejs - sẽ tạo ra 1 server trên máy 
    // chạy lệnh: npm run watch - để lắng nghe sự thay đổi của file scss

// Basic routing: định nghĩa các tuyến đường để truy cập được vào website
    // app.get('/home', (req, res) => { //đường dẫn trang website
    //     res.render('home') //render ra file home theo đường dẫn ở trên
    // })
        // '/home' - đường dẫn trang website(routing path)
        // req(request) - chứa các thông tin yêu cầu từ client lên server(từ biến req có thể lấy ra được: path, menthod...)
        // res(response) - khi server nhận request thì sẽ xử lí và sẽ trả về cho client biến response( có thể setup, tùy chọn trả về cái gì mà client mong muốn)

// Query parameters: tham số truy vấn - TRUYỀN DL QUA URL - dùng cho all các menthod( chủ yếu là GET)
    // Cú pháp: /dườngdẫn/tênfile?biếnparam=từkhóa&ref=từkhóa&key=value....
    // vd: https://www.google.com/search?q=f8&ref=mycv&author=sondn
        // console.log(req.query) --- { q: 'f8', ref: 'mycv', author: 'sondn'} - trả về object gồm key, value
        // console.log(req.query.q) --- f8

        
        // Form default behavior: hành vi mặc định của thẻ form khi bấm submit
        // khi bấm submit sẽ lấy all value của các ô input, select... trong form có attribute là name làm param và đưa lên URL(name="p")
        //vd: http://localhost:3000/news?p=f8+lap+trinh
        // method="GET" --- (GET(mặc định), POST, PUT...)
        // action= "/news" -- submit trên trang news(mặc định không khai báo thì sẽ submit trên URL của chính trang hiện tại)
        // (với method nào và action là submit ở trên URL của trang nào)
        
// GET method: khi nhập URL và nhấn enter, click thẻ a có đường dẫn... thì mặc định là method GET( để nhận dữ liệu từ server về client)
    // (sinh ra query parameter - gửi DL qua URL)
// POST method: khi muốn gửi dữ liệu lên server - sinh ra Form data(key:value) trong devtool-network và gửi lên server(không hiển thị value này trên URL)
    // (sinh ra Form data - không gửi DL qua URL)
        // app.post('/search', (req, res) => { //đường dẫn trang website
        //     console.log(req.body) --{ param: 'F8', gender: 'male' }
        //     res.send('') //render ra file news theo đường dẫn ở trên
        //   })

// Mô hình MVC:
    // M: model - thành phần để tương tác với database
    // V: view - thành phần render layout ra trang website
    // C: controller - thành phần trung chuyển giữa model và view
        // (client gửi yêu cầu lên server > controller lấy database tương ứng từ model và lấy layout tương ứng từ view > trả về lại cho client)