const coursesRouter = require('./product')
const meRouter = require('./me')
const siteRouter = require('./site')
const authRouter = require('./auth')
const cartRouter = require('./cart')
const orderRouter = require('./order')
const commentRouter = require('./comment')
const errorRouter = require('./error')

function routes(app) {
    app.use('/products', coursesRouter)
    app.use('/me', meRouter)
    app.use('/auth', authRouter)
    app.use('/cart', cartRouter)
    app.use('/order', orderRouter)
    app.use('/comment', commentRouter)
    app.use('/error', errorRouter)
    app.use('/', siteRouter)
}

module.exports = routes
