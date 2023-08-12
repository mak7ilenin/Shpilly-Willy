module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const { userProfile } = require('../controllers/userProfileController');
    const { rateUser } = require('../controllers/profilesController');

    router.get('/:userId', function (req, res) {
        if (req.session.userId == undefined) {
            res.redirect('/');
            return;
        } else {
            userProfile(req.params.userId).then(user => {
                loggedHeader(req.session).then(header => {
                    res.render('user', {
                        header: header,
                        authUser: req.session,
                        user: user,
                        userLanguages: user.languages
                    });
                });
            });
        }
    });
    router.post('/:userId', async (req, res) => {
        if (req.session.userId == undefined) {
            res.redirect('/');
            return;
        } else {
            rateUser(req.session.userId, req.params.userId, req.body.rated).then(() => {
                res.redirect('/user/' + req.params.userId);
                return;
            });
        }
    });
    app.use('/user', router);
}