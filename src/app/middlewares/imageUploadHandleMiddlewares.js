const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/images/') // Thư mục lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // Đổi tên file để tránh trùng lặp
  }
})

const upload = multer({ storage: storage })

module.exports =  upload.array('images', 5) //upload.single('image') - upload 1 ảnh