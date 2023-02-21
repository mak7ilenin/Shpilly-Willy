module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const { userProfile, userLanguages } = require('../controllers/userProfileController');

    router.get('/:userId', function (req, res) {
        loggedHeader(req.session).then(data => {
            if(req.session.userId == undefined) {
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
                                educations: ['High school', 'Vocational school', 'Some college', 
                                "Bachelor's / master's", 'Doctoral degree', 'Multiple degrees'],
                                relationshipStatus: ['Single', 'Divorced', 'Widower', 'Other relationship status'],
                                children: ['Do not have children', 'Have children'],
                                religions: ['Atheism', 'Buddhism', 'Hinduism', 
                                'Islam', 'Judaism', 'Catholic Christianity', 'Orthodox Christianity', 'Protestantism', 'Other']
                            });
                        });
                    })
                })
            }
        });
    });
    app.use('/user', router);
}