exports.profile = async function(me) {
    const User = require('../models/User');
    const Country = require('../models/Country');
    let user = await User.findOne({ where: { id: me.profileId }});
    let country = await Country.findOne({ where: { code: user.country }})
    user.country = country.name;
    return user;
}
exports.myLanguages = async function(me) {
    const UserLanguages = require('../models/UserLanguages');
    const Language = require('../models/Language');
    let languagesId = await UserLanguages.findAll({ where: { userId: me.profileId }});
    let languages = [];
    for (let i = 0; i < languagesId.length; i++) {
        let languageName = await Language.findOne({ where: { id: languagesId[i].id }});
        languages.push(languageName.name);
    }
    return languages;
}