exports.users = async function(authUser) {
    const User = require('../models/User');
    authUser = await User.findOne({
        where: {
            username: authUser.userId,
            fullName: authUser.fullName
        }
    });
    const gender = authUser.gender == 'male' ? 'female' : 'male';
    const users = await User.findAll({
        where: { gender: gender }
    });
    return users;
}