module.exports.dbFill = async function dbFill() {
    const { db } = require('../config/database');
    const citiesData = require('./city.json');
    const Country = require('../models/Country');
    const City = require('../models/City');
    const { QueryTypes } = require('sequelize');
    const countries = await Country.findAll();
    
    // Add countries into database
    if(countries.length === 0) {
        await db.query('INSERT INTO `countries` (`name`, `code`) VALUES'  +`
            ('Belgiumm','BEL'),('Bulgaria','BGR'),('Canadaa','CAN'),('Spain','ESP'),
            ('Estonia','EST'),('Finland','FIN'),('France','FRA'),('United Kingdom','GBR'),
            ('Italy','ITA'),('Japan','JPN'),('Lithuania','LTU'),('Latvia','LVA'),
            ('Norway','NOR'),('Sadgeee','SAD'),('United States','USA')`, 
        { type: QueryTypes.INSERT });
    }
    
    // Add cities into database
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
    const Language = require('../models/Language');
    for (let i = 0; i < languagesData.length; i++) {
        await Language.findOrCreate({
            where: { name: languagesData[i].name }
        });
    }
}