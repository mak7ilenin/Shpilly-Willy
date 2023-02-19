module.exports = (app, URheader, loggedHeader) => {
    const router = require('express').Router();
    const { users } = require('../controllers/chatsController');

    
    router.get('/', (req, res) => {
        if(req.session.userId == undefined) {
            res.redirect('/');
            return;
        } else {
            var usersList = [];
            loggedHeader(req.session).then(header => {
                // Get all users of the opposite sex
                users(req.session).then(data => {
                    for (let i = 0; i < data.length; i++) {
                        usersList.push(data[i]);
                    }
                })
                res.render('chats', {
                    header: header,
                    users: usersList,
                    authUser: req.session
                });
            });
        }
    });
    app.use('/chats', router);
}