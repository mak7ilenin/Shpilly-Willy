exports.login = async function(username, password, session) {
    const User = require('../models/User');
    const user = await User.findOne({
        where: {
            username: username,
            password: password
        }
    });
    if(user != null) { return true };
}