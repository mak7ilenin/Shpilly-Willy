module.exports = (app, URheader, LGheader) => {
    const router = require('express').Router();
    const { login } = require('../controllers/loginController');

    router.get('/', function (req, res) {
        var header = '';
        let cookie = req.session;
        if(cookie.userId != undefined) { header = LGheader } 
        else { header = URheader }
        res.render('login', { header: header });
    });
    router.post('/', function (req, res) {
        login(req.body.username, req.body.password).then(response => {
            if(response == true) {
                session = req.session;
                session.userId = req.body.username;
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        })
    });
    app.use('/login', router);
}