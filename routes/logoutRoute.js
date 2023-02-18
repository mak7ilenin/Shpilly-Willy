module.exports = app => {
    const router = require('express').Router();

    router.get('/', function (req, res) {
        req.session.destroy();
        res.redirect('/');
    });
    app.use('/logout', router);
}