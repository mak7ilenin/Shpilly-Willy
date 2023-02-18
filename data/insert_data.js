module.exports.dbFill = async function dbFill() {
    const UserLanguage = require('../models/UserLanguages');
    const Language = require('../models/Language');
    const Country = require('../models/Country');
    const User = require('../models/User');
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

    // Add test user into database
    await User.findOrCreate({
        where: {
            username: 'dzalex72',
            password: 'admin',
            email: 'maksondzjubenko@gmail.com',
            fullName: 'Maksim Dzjubenko',
            gender: 'male',
            birthDate: '2004-12-22',
            country: 'EST',
            city: 'Tallinn',
            education: 'Vocational school',
            relationshipStatus: 'Single',
            children: 'Do not have children',
            religion: 'Atheism',
            photo: 'me.jpg'
        }
    })
    const testUser = await User.findOne({
        where: {
            username: 'dzalex72',
            password: 'admin',
            email: 'maksondzjubenko@gmail.com',
            fullName: 'Maksim Dzjubenko',
            gender: 'male',
            birthDate: '2004-12-22',
            country: 'EST',
            city: 'Tallinn',
            education: 'Vocational school',
            relationshipStatus: 'Single',
            children: 'Do not have children',
            religion: 'Atheism',
            photo: 'me.jpg'
        },
        attributes: ['id']
    });
    const rus = await Language.findOne({
        where: { name: 'Russian' },
        attributes: ['id']
    });
    await UserLanguage.findOrCreate({
        where: {
            userId: testUser.id,
            languageId: rus.id
        }
    })
}