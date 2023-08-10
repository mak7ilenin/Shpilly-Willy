const User = require('../models/User');
const Country = require('../models/Country');

exports.users = async function () {
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

exports.filter = async function (body) {
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
    body.age !== '' ? filter.age = body.age : undefined;
    body.lookingFor !== '' ? filter.fullName = body.lookingFor : undefined;
    body.country !== '' ? filter.country = body.country : undefined;
    body.city !== '' ? filter.city = body.city : undefined;

    filteredUsers = allUsers.filter(function (user) {
        for (let key in filter) {
            if (key == 'fullName') {
                if (user[key].indexOf(filter[key]) > -1)
                    return true;
            }
            if (user[key] === undefined || user[key] != filter[key])
                return false;
        }
        return true;
    });

    return filteredUsers;
}