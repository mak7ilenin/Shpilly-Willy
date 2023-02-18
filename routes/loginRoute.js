module.exports = (app, header) => {
    const router = require('express').Router();

    router.get('/', function (req, res) {
        res.render('login', {
            header: header
        });
    });
    app.use('/login', router);
}