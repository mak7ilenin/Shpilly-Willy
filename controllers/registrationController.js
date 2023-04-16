const User = require('../models/User');
const Language = require('../models/Language');
const UserLanguages = require('../models/UserLanguages');

module.exports.register = async function (body, image) {
    const [thisUser] = await User.findOrCreate({
        where: {
            username: body.username,
            password: body.password,
            fullName: body.fullName,
            email: body.email,
            gender: body.gender,
            birthDate: body.birthDate,
            country: body.country,
            city: body.city,
            education: body.education,
            relationshipStatus: body.relationshipStatus,
            children: body.children,
            religion: body.religion,
            photo: image,
            description: body.description !== undefined ? body.description : ''
        }
    });
    for (let i = 0; i < body.language.length; i++) {
        let thisLanguage = await Language.findOne({
            where: { name: body.language[i] },
        });
        await UserLanguages.findOrCreate({
            where: {
                userId: thisUser.id,
                languageId: thisLanguage.id
            }
        });
    }
}