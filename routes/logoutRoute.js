module.exports = (app, URheader) => {
    const router = require('express').Router();
    const { users } = require('../controllers/homeController');

    // Get all users
    let usersList = [];
    users().then(data => {
        for (let i = 0; i < data.length; i++) {
            usersList.push(data[i]);
        }
    });
    
    router.get('/', function (req, res) {
        if(req.session.userId != undefined) {
            req.session.destroy();
        }
        res.render('home', {
            header: URheader,
            users: usersList,
            authUser: undefined
        });
        // res.redirect('/');
    });
    app.use('/logout', router);
}