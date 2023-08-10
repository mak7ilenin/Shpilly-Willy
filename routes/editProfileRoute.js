module.exports = (app, loggedHeader, __dirname) => {
    const router = require('express').Router();
    const fs = require('fs');
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
        if (req.files != null) {
            const { photo } = req.files;
            if (!photo) return res.sendStatus(400);
            // Create upload directory if not exists
            const uploadDir = __dirname + '/public/upload/private';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
        }
        if (req.files != null) {
            // Move the uploaded image to upload folder
            const { photo } = req.files;
            controller.editProfile(req.session.userId, req.body, photo.name).then(() => {
                res.redirect('/profile');
            });
            photo.mv(__dirname + '/public/upload/private/' + photo.name);
        } else {
            controller.editProfile(req.session.userId, req.body, undefined).then(() => {
                res.redirect('/profile');
            });
        }
    });
    app.use('/profile/edit', router);
}