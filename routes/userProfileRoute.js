module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const { userProfile, userLanguages } = require('../controllers/userProfileController');
    const { additionalData } = require('../controllers/dataRecieverController');

    router.get('/:userId', function (req, res) {
        loggedHeader(req.session).then(data => {
            if (req.session.userId == undefined) {
                res.redirect('/');
                return;
            } else {
                userProfile(req.params.userId).then(user => {
                    userLanguages(req.params.userId).then(languages => {
                        loggedHeader(req.session).then(header => {
                            res.render('user', {
                                header: header,
                                authUser: req.session,
                                user: user,

                                userLanguages: languages,
                                educations: additionalData.educations,
                                relationshipStatus: additionalData.relationshipStatus,
                                children: additionalData.children,
                                religions: additionalData.religions
                            });
                        });
                    })
                })
            }
        });
    });
    app.use('/user', router);
}