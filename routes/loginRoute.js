module.exports = (app, URheader, loggedHeader) => {
    const router = require('express').Router();
    const { login } = require('../controllers/loginController');

    router.get('/', function (req, res) {
        var header = '';
        let cookie = req.session;
        loggedHeader(req.session).then(data => {
            if (cookie.userId != undefined) { header = data }
            else { header = URheader }
            res.render('login', { header: header });
        });
    });
    router.post('/', function (req, res) {
        login(req.body.username, req.body.password).then(user => {
            if (user != null) {
                session = req.session;
                session.userId = user.id;
                session.username = req.body.username;
                session.fullName = user.fullName;
                session.photo = user.photo;
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        })
    });
    app.use('/login', router);
}