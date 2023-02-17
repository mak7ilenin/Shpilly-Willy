module.exports.getDbData = async function() {
    const City = require('../models/City');
    const Country = require('../models/Country');
    const Language = require('../models/Language');

    // All countries
    const countriesList = await Country.findAll();
    var countries = [];
    for (let i = 0; i < countriesList.length; i++) {
        countries = countriesList[i].name;
    }

    // All languages
    const languagesList = await Language.findAll();
    var languages = [];
    for (let i = 0; i < languagesList.length; i++) {
        languages = languagesList[i].name;
    }
}