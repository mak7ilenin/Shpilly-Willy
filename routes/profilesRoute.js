module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const { users, filter, rateUser } = require('../controllers/profilesController');

    router.get('/', async (req, res) => {
        if (req.session.userId == undefined) {
            res.redirect('/');
            return;
        } else {
            if (JSON.stringify(req.query) === "{}") {
                users(req.session.userId).then(users => {
                    loggedHeader(req.session).then(header => {
                        // Get all users of the opposite sex
                        res.render('profiles', {
                            header: header,
                            users: users,
                            authUser: req.session,
                            message: ''
                        });
                    });
                });
            } else {
                rateUser(req.session.userId, req.query.user, req.query.rated).then(() => {
                    res.redirect('/profiles');
                    return;
                });
            }
        }
    });

    router.post('/', async (req, res) => {
        if (!req.body.age && !req.body.lookingFor && !req.body.country && !req.body.city) {
            users(req.session.userId).then(users => {
                loggedHeader(req.session).then(header => {
                    res.status(404).render('profiles', {
                        header: header,
                        users: users,
                        message: ''
                        // message: 'Please fill in at least one field!'
                    });
                });
            });
            return;
        }
        loggedHeader(req.session).then(header => {
            filter(req.body, req.session.userId)
                .then(data => {
                    res.render('profiles', {
                        header: header,
                        users: data,
                        authUser: req.session,
                        message: ''
                    });
                });
        });
    });
    app.use('/profiles', router);
}