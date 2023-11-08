const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const handlebars = require('express-handlebars')
const { engine } = require('express-handlebars');
const app = express();
const routes = require('./routes'); //nạp function routes xuất từ file routes/index.js
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
); //xử lí DL từ form submit(qua HTML) lên server
app.use(express.json()); //xử lí DL từ form submit(qua các thư viện JS, XMLHttpRequest, fetch...) lên server

// HTTP loger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        //định nghĩa hbs
        extname: '.hbs', //đổi đuôi handlebars thành .hbs
    }),
);
app.set('view engine', 'hbs'); //sử dụng view engine hbs
app.set('views', path.join(__dirname, 'resources/views')); //set lại path đến view engine

// routes init
routes(app);

            app.listen(port, () => {
                console.log(`Example app listening on port ${port}`);
            });
