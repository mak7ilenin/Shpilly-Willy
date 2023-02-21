exports.users = async function() {
    const User = require('../models/User');
    const Country = require('../models/Country');
    let users = await User.findAll();
    for (let i = 0; i < users.length; i++) {
        let userCountry = await Country.findOne({
            where: { code: users[i].country }
        });
        users[i].country = userCountry.name;

        // Calculate user's age
        let nm_date = (users[i].birthDate).replace('-', '/').replace('-', '/');
        let date = new Date(nm_date);
        let month_diff = Date.now() - new Date(date);
        let age_dt = new Date(month_diff); 
        let year = age_dt.getUTCFullYear();
        let age = Math.abs(year - 1970);
        users[i].age = age;
    }
    return users;
}

exports.filter = async function(age, gender, country, city) {
    const { Op } = require('sequelize');
    const User = require('../models/User');
    const Country = require('../models/Country');

    let filteredUsers = [];
    let allUsers = await User.findAll();
    // Change country code to country name
    for (let i = 0; i < allUsers.length; i++) {
        let user_country = await Country.findOne({
            where: { code: allUsers[i].country }
        });
        allUsers[i].country = user_country.name;
    }

    for (let i = 0; i < allUsers.length; i++) {
        let nm_date = (allUsers[i].birthDate).replace('-', '/').replace('-', '/');
        let date = new Date(nm_date);
        let month_diff = Date.now() - new Date(date);
        let age_dt = new Date(month_diff); 
        let year = age_dt.getUTCFullYear();
        let ft_age = Math.abs(year - 1970);
        allUsers[i].age = ft_age;
    }

    let filter = {};
    if(age !== '') { filter.age = age } else {}
    if(gender !== '') { filter.gender = gender } else {}
    if(country !== '') { filter.country = country } else {}
    if(city !== '') { filter.city = city } else {}

    filteredUsers = allUsers.filter(function(user) {
        for (let key in filter) {
          if (user[key] === undefined || user[key] != filter[key])
            return false;
        }
        return true;
      });

    return filteredUsers;
}