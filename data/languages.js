module.exports.addLanguages = async function addLanguages() {
    const languagesData = require('./language.json');
    const Language = require('../models/Language');
    const languages = await Language.findAll();
    if(languages.length === 0) {
        for (let i = 0; i < languagesData.length; i++) {
            const languagesList = languagesData.find(lg => lg);
            console.log(languagesList);
        }
    } else {

    }
}