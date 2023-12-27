const coursesRouter = require('./courses')
const meRouter = require('./me')
const siteRouter = require('./site')
const authRouter = require('./auth')
const cartRouter = require('./cart')
const commentRouter = require('./comment')
const errorRouter = require('./error')

function routes(app) {
    app.use('/courses', coursesRouter)
    app.use('/me', meRouter)
    app.use('/auth', authRouter)
    app.use('/cart', cartRouter)
    app.use('/comment', commentRouter)
    app.use('/error', errorRouter)
    app.use('/', siteRouter)
}

module.exports = routes
