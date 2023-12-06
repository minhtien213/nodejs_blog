const Handlebars = require('handlebars')

module.exports = {
    sub: (currentPage, totalPage) => {
        if(totalPage === 0) {
            return ''
        }
        currentPage--
        currentPage = (currentPage < 1) ?  1 : currentPage 
        return `<a class="page-link" href="?_pagi&page=${currentPage}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>`
    },
    sum: (currentPage, totalPage) => {
        if(totalPage === 0) {
            // totalPage = 1
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
        const sortType = field === sort.column ? sort.type : 'default';
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
        let paginationHTML = '';
        for (let i = 1; i <= totalPage; i++) {
            paginationHTML += `<li class="page-item"><a class="page-link" href="?_pagi&page=${i}">${i}</a></li>`;
        }
        return paginationHTML;
    }
    
}