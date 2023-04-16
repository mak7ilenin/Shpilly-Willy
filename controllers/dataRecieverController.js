const Language = require('../models/Language');
const Country = require('../models/Country');
const City = require('../models/City');

// All languages
module.exports.languages = async function () {
    const languages = await Language.findAll()
    return languages;
}

// All countries
module.exports.countries = async function () {
    const countries = await Country.findAll()
    return countries;
}

// All cities
module.exports.cities = async function () {
    const cities = await City.findAll()
    return cities;
}

// All duplicate data
module.exports.additionalData = {
    educations: ['High school', 'Vocational school', 'Some college',
        "Bachelor's / master's", 'Doctoral degree', 'Multiple degrees'],
    relationshipStatus: ['Single', 'Divorced', 'Widower', 'Other relationship status'],
    children: ['Do not have children', 'Have children'],
    religions: ['Atheism', 'Buddhism', 'Hinduism',
        'Islam', 'Judaism', 'Catholic Christianity', 'Orthodox Christianity', 'Protestantism', 'Other']
}