// các tuyến đường liên quan đến News thì tạo phương thức ở class này

class SiteController {
    index(req, res) {
        res.render('home');
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
