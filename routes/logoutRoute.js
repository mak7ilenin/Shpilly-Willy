module.exports = (app, URheader) => {
    const router = require('express').Router();
    const { users } = require('../controllers/homeController');

    // Get all users
    let usersList = null;
    users().then(data => { usersList = data });

    router.get('/', function (req, res) {
        if (req.session.userId != undefined) {
            req.session.destroy();

            res.render('home', {
                header: URheader,
                users: usersList,
                authUser: undefined
            });
        }
    });
    app.use('/logout', router);
}