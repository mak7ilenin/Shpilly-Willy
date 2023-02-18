module.exports = (app, __dirname, header) => {
    const { countries, languages, cities, register } = require('../controllers/registrationController');
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
            header: header,
            languages: languagesList,
            countries: countriesList,
            cities: citiesList,
            educations: ['High school', 'Vocational school', 'Some college', 
            "Bachelor's / master's", 'Doctoral degree', 'Multiple degrees'],
            relationshipStatus: ['Single', 'Divorced', 'Widower', 'Other relationship status'],
            children: ['Do not have children', 'Have children'],
            religions: ['Atheism', 'Buddhism', 'Hinduism', 
            'Islam', 'Judaism', 'Catholic Christianity', 'Orthodox Christianity', 'Protestantism', 'Other']
        });
    });
    router.post('/', function(req, res) {
        console.log(req.body);
        if(!req.body.username || !req.body.password
            || !req.body.fullName || !req.body.email
            || !req.body.birthDate || !req.body.country
            || !req.body.city || !req.body.language
            || !req.body.education || !req.body.relationshipStatus
            || !req.body.children || !req.body.religion 
            || !req.body.gender) 
        {
            res.status(404).send({
                message: 'Fill in all required fields!' 
            });
            return;
        }
        res.send('Your account was successfully created!');

        // Get the file that was set to our field named "image"
        const { image } = req.files;
        // If no image submitted, exit
        if (!image) return res.sendStatus(400);
        // Create upload directory if not exists
        const fs = require('fs');
        const uploadDir = __dirname + '/public/upload';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        // Move the uploaded image to our upload folder
        image.mv(__dirname + '/public/upload/' + image.name);

        register(
            req.body.username, req.body.password, req.body.fullName, req.body.email,
            req.body.gender, req.body.birthDate, req.body.country, req.body.city,
            req.body.language, req.body.education, req.body.relationshipStatus,
            req.body.children, req.body.religion, image.name, req.body.description
        );
    });

    app.use('/registration', router);
}