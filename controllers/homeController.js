exports.users = async function () {
    const User = require('../models/User');
    const users = await User.findAll();
    var usersList = [];
    for (let i = 0; i < users.length; i++) {
        let user = users[i].dataValues;

        let nm_date = (user.birthDate).replace('-', '/').replace('-', '/');
        let date = new Date(nm_date);
        let month_diff = Date.now() - new Date(date);
        let age_dt = new Date(month_diff);
        let year = age_dt.getUTCFullYear();
        var age = Math.abs(year - 1970);

        user.birthDate = age;
        usersList.push(user);
    }
    // Reshuffle users list
    const shuffledUsers = [...usersList]
    const length = shuffledUsers.length;

    for (let start = 0; start < length; start++) {
        const randomPosition = Math.floor((shuffledUsers.length - start) * Math.random())
        const randomItem = shuffledUsers.splice(randomPosition, 1)

        shuffledUsers.push(...randomItem)
    }
    return shuffledUsers;
}