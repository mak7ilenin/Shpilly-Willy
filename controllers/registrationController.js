
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

// Register user
module.exports.register = async function(
    username, password, fullName, email,
    gender, birthDate, country, city,
    language, education, relationshipStatus,
    children, religion, photo, description
) 
{
    const User = require('../models/User');
    const Language = require('../models/Language');
    const UserLanguages = require('../models/UserLanguages');
    await User.findOrCreate({
        where: {
            username: username,
            password: password,
            fullName: fullName,
            email: email,
            gender: gender,
            birthDate: birthDate,
            country: country,
            city: city,
            education: education,
            relationshipStatus: relationshipStatus,
            children: children,
            religion: religion,
            photo: photo,
            description: description !== undefined ? description : ''
        }
    });
    const thisUser = await User.findOne({
        where: {
            username: username,
            password: password,
            fullName: fullName,
            email: email,
            gender: gender,
            birthDate: birthDate,
            country: country,
            city: city,
            education: education,
            relationshipStatus: relationshipStatus,
            children: children,
            religion: religion,
            photo: photo,
            description: description !== undefined ? description : ''
        },
        attributes: ['id']
    });
    for (let i = 0; i < language.length; i++) {
        let thisLanguage = await Language.findOne({
            where: { name: language[i] },
            attributes: ['id']
        });
        await UserLanguages.findOrCreate({
            where: {
                userId: thisUser.id,
                languageId: thisLanguage.id
            }
        });
    }
}