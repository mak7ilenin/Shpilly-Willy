module.exports = app => {
    const router = require('express').Router();

    router.get('/', function (req, res) {
        if(req.session.userId != undefined) {
            req.session.destroy();
        }
        res.redirect('/');
    });
    app.use('/logout', router);
}