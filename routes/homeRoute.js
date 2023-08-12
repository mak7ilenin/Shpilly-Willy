module.exports = (app, URheader, loggedHeader) => {
    const router = require('express').Router();
    const { users } = require('../controllers/homeController');

    router.get('/', function (req, res) {
        var header = '';
        let cookie = req.session;
        let userId = cookie.userId || null;
        users(userId).then(usersList => {
            loggedHeader(cookie).then(LGheader => {
                if (cookie.userId != undefined) { header = LGheader }
                else { header = URheader; cookie = undefined }

                res.render('home', {
                    header: header,
                    users: usersList,
                    authUser: cookie
                });
            });
        });
    });
    app.use('/', router);
};