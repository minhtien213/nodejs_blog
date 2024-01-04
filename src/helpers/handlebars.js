const Handlebars = require('handlebars')

module.exports = {
    stt: (a, b) => a + b,
    previousPage: (currentPage, totalPage) => {
        if(totalPage === 0 || totalPage === 1) {
            return ''
        }
        currentPage--
        currentPage = (currentPage < 1) ?  1 : currentPage 
        return `<a class="page-link" href="?_pagi&page=${currentPage}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>`
    },
    nextPage: (currentPage, totalPage) => {
        if(totalPage === 0 || totalPage === 1) {
            return ''
        }
        currentPage++
        currentPage = (currentPage > totalPage) ?  totalPage : currentPage 
        return `<a class="page-link" href="?_pagi&page=${currentPage}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>`
    },
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default'
        const icons = {
            default: 'fa-solid fa-sort',
            asc: 'fa-solid fa-arrow-up-wide-short',
            desc: 'fa-solid fa-arrow-up-short-wide'
        }

        const types = {
            default: 'desc', //mặc định khi chưa click icon sort
            asc: 'desc',
            desc: 'asc',
        } //click vào icon sort sẽ thay đổi icon theo type sort

        const icon = icons[sortType]
        const type = types[sortType]

        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
        const output =  `<a href="${href}">
                    <i class="${icon}"></i>
                </a>`
        return new Handlebars.SafeString(output); //bảo vệ link
    },

    pagination: function(totalPage) {
        if(totalPage <= 1){
            return ''
        }
        let paginationHTML = ''
        for (let i = 1; i <= totalPage; i++) {
            paginationHTML += `<li class="page-item"><a class="page-link" href="?_pagi&page=${i}">${i}</a></li>`
        }
        return paginationHTML
    },

    loadmoreSearchResult: function(keySearch, resultSize, productsCount) {
        resultSize += 2
        resultSize = resultSize > productsCount ? productsCount : resultSize
        return `<a href="/search-results?keysearch=${keySearch}&result=${resultSize}" class="btn btn-outline-primary mt-4 mb-4">Load more...</a>`
    },

    loadCommentForm(account, product){
        if(account){
            return `<form method="POST" action="/comment/${product._id}/create-comment" class="comment_form">
                        <input type="text" class="form-control comment_input" name="content" required>
                        <button type="submit" class="btn btn-primary commnet_btn btn-sm mt-2">Đăng</button>
                    </form>`
        }else{
            return `<form method="POST" action="/comment/${product._id}/create-comment" class="comment_form" hidden>
                        <input type="text" class="form-control comment_input" name="content" required>
                        <button type="submit" class="btn btn-primary commnet_btn btn-sm mt-2">Đăng</button>
                    </form>
                    <p>Đăng nhập để viết đánh giá. <a id="nav_login_btn" href="#">Login</a></p>`
        }
    },

    disabledAddCartBtn(account, product){
        if(account){
            // Mặc định trạng thái của sản phẩm chưa có trong giỏ hàng
            let productInCart = false;
    
            // Lặp qua mảng cart để tìm sản phẩm với _id tương ứng
            for (const cartItem of account.cart) {
                // Kiểm tra xem productId có tồn tại trong bất kỳ đối tượng cart nào không
                if (cartItem.product.equals(product._id)) {
                        // Nếu sản phẩm đã có trong giỏ hàng, đặt trạng thái là true và thoát khỏi vòng lặp
                        productInCart = true;
                        break;
                }
            }
            // Dựa vào trạng thái để trả về giá trị tương ứng
            if (productInCart) {
                return `<button type="submit" id="add_cart" class="btn btn-primary" data-product-id="${product._id}" disabled>Đã có trong giỏ hàng</button>`
            } else {
                return `<button type="submit" id="add_cart" class="btn btn-primary" data-product-id="${product._id}">Thêm vào giỏ hàng</button>`
            }
        }else{
            return `<button type="submit" id="add_cart" class="btn btn-primary" data-product-id="${product._id}">Thêm vào giỏ hàng</button>`
        }
    }
    
}