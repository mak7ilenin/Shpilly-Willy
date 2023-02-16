module.exports.addCountries = async function addCountries() {
    const { db } = require('../config/database');
    const citiesData = require('./city.json');
    const Country = require('../models/Country');
    const City = require('../models/City');
    const { QueryTypes } = require('sequelize');
    const countries = await Country.findAll();
    
    // Check for countries   
    if(countries.length === 0) {
        await db.query('INSERT INTO `countries` (`name`, `code`) VALUES'  +`
            ('Belgiumm','BEL'),('Bulgaria','BGR'),('Canadaa','CAN'),('Spain','ESP'),
            ('Estonia','EST'),('Finland','FIN'),('France','FRA'),('United Kingdom','GBR'),
            ('Italy','ITA'),('Japan','JPN'),('Lithuania','LTU'),('Latvia','LVA'),
            ('Norway','NOR'),('Sadgeee','SAD'),('United States','USA')`, 
        { type: QueryTypes.INSERT });
    }
    
    // Check for cities
    const cities = await City.findAll();
    if(cities.length != 0) {
        for (let i = 0; i < cities.length; i++) {
            if(citiesData[i].name != cities[i].name) {
                City.create({ 
                    where: {
                        name: citiesData[i].name,
                        code: citiesData[i].code
                    }
                });
            }
        }
    } else {
        for (let i = 0; i < citiesData.length; i++) {
            City.create({ 
                where: {
                    name: citiesData[i].name,
                    code: citiesData[i].code
                }
            });
        }
    }
}