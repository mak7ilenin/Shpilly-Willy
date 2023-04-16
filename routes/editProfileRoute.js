module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const controller = require('../controllers/profileController');
    const { countries, languages, cities, additionalData } = require('../controllers/dataRecieverController');

    // Get all countries
    var countriesList = null;
    countries().then(data => { countriesList = data; });

    // Get all languages
    var languagesList = null;
    languages().then(data => { languagesList = data; });

    // Get all cities
    var citiesList = null;
    cities().then(data => { citiesList = data; });

    router.get('/', function (req, res) {
        if (req.session.userId == undefined) {
            res.redirect('/');
            return;
        }
        controller.profile(req.session).then(user => {
            controller.myLanguages(req.session).then(languages => {
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
                        educations: additionalData.educations,
                        relationshipStatus: additionalData.relationshipStatus,
                        children: additionalData.children,
                        religions: additionalData.religions
                    });
                });
            });
        });
    });
    router.post('/', function (req, res) {
        if (req.session.userId == undefined) {
            res.redirect('/');
            return;
        }
        controller.editProfile(req.session.userId).then(user => {

        });
    });
    app.use('/profile/edit', router);
}