exports.users = async function(authUser) {
    const User = require('../models/User');
    const Country = require('../models/Country');
    authUser = await User.findOne({
        where: {
            username: authUser.userId,
            fullName: authUser.fullName
        }
    });
    const gender = authUser.gender == 'Male' ? 'Female' : 'Male';
    let users = await User.findAll({
        where: { gender: gender }
    });
    for (let i = 0; i < users.length; i++) {
        let country = await Country.findOne({
            where: { code: users[i].country },
            attributes: ['name']
        });
        users[i].country = country.name;

        // Calculate user's age
        let nm_date = (users[i].birthDate).replace('-', '/').replace('-', '/');
        let date = new Date(nm_date);
        let month_diff = Date.now() - new Date(date);
        let age_dt = new Date(month_diff);   
        let year = age_dt.getUTCFullYear(); 
        let age = Math.abs(year - 1970);
        users[i].age = age
    }
    return users;
}