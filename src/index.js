const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
// const handlebars = require('express-handlebars')
const { engine } = require('express-handlebars');

const routes = require('./routes'); //nạp function routes xuất từ file routes/index.js
const db = require('./config/db');

// connect to DB
db.connect()

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
); //xử lí DL từ form submit(qua HTML) lên server
app.use(express.json()); //xử lí DL từ form submit(qua các thư viện JS, XMLHttpRequest, fetch...) lên server

app.use(methodOverride('_method')) //thư viện đổi method(đổi POST -> PUT khi update...)

// HTTP loger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        //định nghĩa hbs
        extname: '.hbs', //đổi đuôi handlebars thành .hbs
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs'); //sử dụng view engine hbs
app.set('views', path.join(__dirname, 'resources', 'views')); //set lại path đến view engine

// routes init
routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
