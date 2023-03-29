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

    // Add test users into database
    // User 1
    await User.findOrCreate({
        where: {
            username: 'dzalex72',
            password: 'admin',
            email: 'maksondzjubenko@gmail.com',
            fullName: 'Maksim Dzjubenko',
            gender: 'Male',
            birthDate: '2004-12-22',
            country: 'EST',
            city: 'Tallinn',
            education: 'Vocational school',
            relationshipStatus: 'Single',
            children: 'Do not have children',
            religion: 'Atheism',
            photo: 'me.jpg'
        }
    });
    const testUser1 = await User.findOne({
        where: {
            username: 'dzalex72',
            password: 'admin',
            email: 'maksondzjubenko@gmail.com',
            fullName: 'Maksim Dzjubenko',
            gender: 'Male',
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
            userId: testUser1.id,
            languageId: rus.id
        }
    });

    // User 2
    await User.findOrCreate({
        where: {
            username: 'mtalhead',
            password: 'daniel228',
            email: 'mtalhead24@gmail.com',
            fullName: 'Daniel Monjane',
            gender: 'Male',
            birthDate: '2004-01-24',
            country: 'EST',
            city: 'Tartu',
            education: "Bachelor's / master's",
            relationshipStatus: 'Single',
            children: 'Do not have children',
            religion: 'Atheism',
            photo: 'daniel.jpg'
        }
    });
    const testUser2 = await User.findOne({
        where: {
            username: 'mtalhead',
            password: 'daniel228',
            email: 'mtalhead24@gmail.com',
            fullName: 'Daniel Monjane',
            gender: 'Male',
            birthDate: '2004-01-24',
            country: 'EST',
            city: 'Tartu',
            education: "Bachelor's / master's",
            relationshipStatus: 'Single',
            children: 'Do not have children',
            religion: 'Atheism',
            photo: 'daniel.jpg'
        },
        attributes: ['id']
    });
    const eng = await Language.findOne({
        where: { name: 'English' },
        attributes: ['id']
    });
    await UserLanguage.findOrCreate({
        where: {
            userId: testUser2.id,
            languageId: eng.id
        }
    });

    // User 3
    await User.findOrCreate({
        where: {
            username: 'kalamain228',
            password: 'fizzmain007',
            email: 'timothy@gmail.com',
            fullName: 'Timothy Main',
            gender: 'Male',
            birthDate: '2004-10-22',
            country: 'EST',
            city: 'Tallinn',
            education: 'Some college',
            relationshipStatus: 'Other relationship status',
            children: 'Do not have children',
            religion: 'Islam',
            photo: 'timothy.png'
        }
    });
    const testUser3 = await User.findOne({
        where: {
            username: 'kalamain228',
            password: 'fizzmain007',
            email: 'timothy@gmail.com',
            fullName: 'Timothy Main',
            gender: 'Male',
            birthDate: '2004-10-22',
            country: 'EST',
            city: 'Tallinn',
            education: 'Some college',
            relationshipStatus: 'Other relationship status',
            children: 'Do not have children',
            religion: 'Islam',
            photo: 'timothy.png'
        },
        attributes: ['id']
    });
    const est = await Language.findOne({
        where: { name: 'Estonian' },
        attributes: ['id']
    });
    await UserLanguage.findOrCreate({
        where: {
            userId: testUser3.id,
            languageId: est.id
        }
    });

    const PORT = process.env.PORT || 3000;
    console.log(`-- Everything is fine! You can use the app on [PORT: ${PORT}] --`);
}