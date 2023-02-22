module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const { profile, myLanguages } = require('../controllers/profileController');
    const { cities, countries, languages } = require('../controllers/registrationController');

    // Get all countries
    let countriesList = [];
    countries().then(data => { 
        for (let i = 0; i < data.length; i++) {
            countriesList.push(data[i]);
        } 
    });

    // Get all languages
    let languagesList = [];
    languages().then(data => { 
        for (let i = 0; i < data.length; i++) {
            languagesList.push(data[i]);
        }
    });

    // Get all cities
    let citiesList = [];
    cities().then(data => { 
        for (let i = 0; i < data.length; i++) {
            citiesList.push(data[i]);
        } 
    });

    router.get('/', function (req, res) {
        if(req.session.userId == undefined) {
            res.redirect('/');
            return;
        } else {
            console.log('bbbbbbbbbbbbbb');
            profile(req.session).then(user => {
                myLanguages(req.session).then(languages => {
                    loggedHeader(req.session).then(header => {
                        res.render('edit-profile', {
                            header: header,
                            authUser: req.session,
                            user: user,
                            
                            userLanguages: languages,
                            languages: languagesList,
                            countries: countriesList,
                            cities: citiesList,
                            userLanguages: languages,
                            educations: ['High school', 'Vocational school', 'Some college', 
                            "Bachelor's / master's", 'Doctoral degree', 'Multiple degrees'],
                            relationshipStatus: ['Single', 'Divorced', 'Widower', 'Other relationship status'],
                            children: ['Do not have children', 'Have children'],
                            religions: ['Atheism', 'Buddhism', 'Hinduism', 
                            'Islam', 'Judaism', 'Catholic Christianity', 'Orthodox Christianity', 'Protestantism', 'Other']
                        });
                    });
                });
            });
        }
    });
    app.use('/profile/edit', router);
}