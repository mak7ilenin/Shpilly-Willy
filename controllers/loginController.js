exports.login = async function(username, password, session) {
    const { Op } = require('sequelize');
    const User = require('../models/User');
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours());
    let minutes = String(date.getMinutes());
    let seconds = String(date.getSeconds());
    let dateNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const user = await User.findOne({
        where: {
            username: username,
            password: password
        }
    });
    let deletedUsers = await User.findAll({
        where: { deletedAt: { [Op.ne]: null }}
    });
    for (let i = 0; i < deletedUsers.length; i++) {
        if(deletedUsers[i].deletedAt == dateNow) {
    
        }
    }

    if(user != null) { return user }
    else { return null };
}