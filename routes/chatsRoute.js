module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const { users, filter } = require('../controllers/chatsController');

    
    router.get('/', async (req, res) => {
        if(req.session.userId == undefined) {
            res.redirect('/');
            return;
        } else {
            users().then(users => {
                loggedHeader(req.session).then(header => {
                    // Get all users of the opposite sex
                    res.render('chats', {
                        header: header,
                        users: users,
                        authUser: req.session,
                        message: ''
                    });
                });
            });
        }
    });

    router.post('/', async (req, res) => {
        if(!req.body.age && !req.body.lookingFor && !req.body.country && !req.body.city) {
            users().then(users => {
                loggedHeader(req.session).then(header => {
                    res.status(404).render('chats', {
                        header: header,
                        users: users,
                        message: 'Please fill in at least one field!'
                    });
                });
            });
            return;
        }
        loggedHeader(req.session).then(header => {
            filter(
                req.body.age, req.body.lookingFor, 
                req.body.country, req.body.city
            ).then(data => {
                res.render('chats', {
                    header: header,
                    users: data,
                    authUser: req.session,
                    message: ''
                });
            });
        })
    });
    app.use('/chats', router);
}