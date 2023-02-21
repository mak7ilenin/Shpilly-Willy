module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const { profile, myLanguages } = require('../controllers/profileController');

    router.get('/', function (req, res) {
        if(req.session.userId == undefined) {
            res.redirect('/');
            return;
        } else {
            profile(req.session).then(user => {
                myLanguages(req.session).then(languages => {
                    loggedHeader(req.session).then(header => {
                        res.render('profile', {
                            header: header,
                            authUser: req.session,
                            user: user,
                            
                            languages: languages,
                            educations: ['High school', 'Vocational school', 'Some college', 
                            "Bachelor's / master's", 'Doctoral degree', 'Multiple degrees'],
                            relationshipStatus: ['Single', 'Divorced', 'Widower', 'Other relationship status'],
                            children: ['Do not have children', 'Have children'],
                            religions: ['Atheism', 'Buddhism', 'Hinduism', 
                            'Islam', 'Judaism', 'Catholic Christianity', 'Orthodox Christianity', 'Protestantism', 'Other']
                        });
                    });
                })
            });
        }
    });
    app.use('/profile', router);
}