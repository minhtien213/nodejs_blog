const coursesRouter = require('./courses')
const meRouter = require('./me')
const siteRouter = require('./site');
const authRouter = require('./auth');
const cartRouter = require('./cart');

function routes(app) {
    app.use('/courses', coursesRouter)
    app.use('/me', meRouter)
    app.use('/auth', authRouter)
    app.use('/cart', cartRouter)
    app.use('/', siteRouter)
}

module.exports = routes;
