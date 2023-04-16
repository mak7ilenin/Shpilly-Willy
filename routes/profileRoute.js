module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const { profile, myLanguages } = require('../controllers/profileController');
    const { additionalData } = require('../controllers/dataRecieverController');

    router.get('/', function (req, res) {
        if (req.session.userId == undefined) {
            res.redirect('/');
            return;
        }
        profile(req.session).then(user => {
            myLanguages(req.session).then(languages => {
                loggedHeader(req.session).then(header => {
                    res.render('profile', {
                        header: header,
                        authUser: req.session,
                        user: user,

                        languages: languages,
                        educations: additionalData.educations,
                        relationshipStatus: additionalData.relationshipStatus,
                        children: additionalData.children,
                        religions: additionalData.religions
                    });
                });
            })
        });
    });
    router.post('/', async function (req, res) {
        const User = require('../models/User');
        if (req.session.userId == undefined) {
            res.redirect('/');
            return;
        }
        if (req.session.userId != undefined) {
            await User.destroy({
                where: { id: req.session.userId }
            });
            req.session.destroy();
            res.redirect('/');
        }
    });
    app.use('/profile', router);
}