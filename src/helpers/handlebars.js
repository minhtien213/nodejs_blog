const Handlebars = require('handlebars')

module.exports = {
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
    }
}