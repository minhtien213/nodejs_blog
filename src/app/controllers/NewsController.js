// các tuyến đường liên quan đến News thì tạo phương thức ở class này

class NewsController {
    index(req, res) {
        res.render('news');
    }

    show(req, res) {
        res.send('news details');
    }
}

module.exports = new NewsController();
