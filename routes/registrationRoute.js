module.exports = app => {
    const { countries, languages, cities } = require('../controllers/registrationController');
    const router = require('express').Router();
    
    // Get all countries
    var countriesList = [];
    countries().then(data => { 
        for (let i = 0; i < data.length; i++) {
            countriesList.push(data[i]);
        } 
    });

    // Get all languages
    var languagesList = [];
    languages().then(data => { 
        for (let i = 0; i < data.length; i++) {
            languagesList.push(data[i]);
        } 
    });

    // Get all cities
    var citiesList = [];
    cities().then(data => { 
        for (let i = 0; i < data.length; i++) {
            citiesList.push(data[i]);
        } 
    });

    
    router.get('/', function(req, res) {
        res.render('registration', {
            languages: languagesList,
            countries: countriesList,
            cities: citiesList,
            educations: ['High school', 'Vocational school', 'Some college', 
            "Bachelor's / master's", 'Doctoral degree', 'Multiple degrees'],
            relationshipStatus: ['Single', 'Divorced', 
            'Widower', 'Other relationship status'],
            children: ['Do not have children', 'Have children'],
            religions: ['Atheism', 'Buddhism', 'Hinduism', 
            'Islam', 'Judaism', 'Catholic Christianity', 'Orthodox Christianity', 'Protestantism', 'Other']
        });
    });
    app.use('/registration', router);
}