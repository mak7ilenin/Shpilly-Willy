const User = require('../models/User');
const Country = require('../models/Country');
const UserLanguages = require('../models/UserLanguages');
const Language = require('../models/Language');

exports.userProfile = async function (userId) {
    // Find this user
    const user = await User.findOne({ where: { id: userId } });
    
    // Get user's country
    let userCountry = await Country.findOne({ where: { code: user.country } });
    user.country = userCountry.name;

    // Calculate user's age
    let nm_date = (user.birthDate).replace('-', '/').replace('-', '/');
    let date = new Date(nm_date);
    let month_diff = Date.now() - new Date(date);
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    user.age = Math.abs(year - 1970);

    // Get user's languages
    const userLanguages = await UserLanguages.findAll({
        where: { userId: userId }
    });
    let languages = [];
    for (let i = 0; i < userLanguages.length; i++) {
        let language = await Language.findOne({
            where: { id: userLanguages[i].languageId }
        });
        languages.push(language);
    }
    user.languages = languages;

    return user;
}