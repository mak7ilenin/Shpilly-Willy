
// All languages
module.exports.languages = async function() {
    const Language = require('../models/Language');
    const languagesList = await Language.findAll();
    let languages = [];
    for (let i = 0; i < languagesList.length; i++) {
        languages.push(languagesList[i].name);
    }
    return languages;
}

// All countries
module.exports.countries = async function() {
    const Country = require('../models/Country');
    const countriesList = await Country.findAll();
    let countries = [];
    for (let i = 0; i < countriesList.length; i++) {
        countries.push(countriesList[i]);
    }
    return countries;
}

// All cities
module.exports.cities = async function() {
    const City = require('../models/City');
    const citiesList = await City.findAll();
    let cities = [];
    for (let i = 0; i < citiesList.length; i++) {
        cities.push(citiesList[i]);
    }
    return cities;
}