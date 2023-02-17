module.exports.dbFill = async function dbFill() {
    const Language = require('../models/Language');
    const Country = require('../models/Country');
    const City = require('../models/City');
    
    // Add countries into database
    const countriesData = require('./country.json');
    for (let i = 0; i < countriesData.length; i++) {
        await Country.findOrCreate({
            where: {
                name: countriesData[i].name,
                code: countriesData[i].code
            }
        });
    }
    
    // Add cities into database
    const citiesData = require('./city.json');
    for (let i = 0; i < citiesData.length; i++) {
        let country = await Country.findOne({
            where: { code: citiesData[i].code },
            attributes: ['code']
        });
        if(country != null) {
            await City.findOrCreate({
                where: { 
                    name: citiesData[i].name,
                    country: country.code
                },
            });
        }
    }

    // Add languages into database
    const languagesData = require('./language.json');
    for (let i = 0; i < languagesData.length; i++) {
        await Language.findOrCreate({
            where: { name: languagesData[i].name }
        });
    }
}