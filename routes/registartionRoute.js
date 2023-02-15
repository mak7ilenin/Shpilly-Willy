module.exports = app => {
    // const controller = require('../controllers/registrationController');
    const router = require('express').Router();
    router.get('/', function(req, res) {
        res.render('registration', {
            countries: ['Estonia', 'Russia'],
            cities: ['Tallinn', 'Moscow'],
            educations: ['High school', 'Vocational school', 'Some college', 
            "Bachelor's / master's", 'Doctoral degree', 'Multiple degrees'],
            relationshipStatus: ['Single', 'Divorced', 
            'Widower', 'Other relationship status'],
            childrens: ['Do not have children', 'Have children'],
            religions: ['Atheism', 'Buddhism', 'Hinduism', 
            'Islam', 'Judaism', 'Catholic Christianity', 'Orthodox Christianity', 'Protestantism', 'Other']
        });
    });
    app.use('/registration', router);
}