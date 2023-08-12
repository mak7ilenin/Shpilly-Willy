const User = require('../models/User');
const Country = require('../models/Country');
const UserPref = require('../models/UserPref');
const { Op } = require("sequelize");

exports.users = async function (authUserId) {
    const currentUser = await User.findByPk(authUserId);
    let users = await User.findAll({
        where: {
            gender: { [Op.notLike]: currentUser.gender }
        }
    });
    const dislikedUsers = await UserPref.findAll({
        where: {
            authId: authUserId,
            status: 'dislike'
        },
        attributes: ['userId']
    });
    const dislikedUsersId = dislikedUsers.map(user => user.userId);
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
    users = users.filter(user => !dislikedUsersId.includes(user.id));
    return users;
}

exports.filter = async function (body, authUserId) {
    let filteredUsers = [];
    const currentUser = await User.findByPk(authUserId);
    const dislikedUsers = await UserPref.findAll({
        where: {
            authId: authUserId,
            status: 'dislike'
        },
        attributes: ['userId']
    });
    const dislikedUsersId = dislikedUsers.map(user => user.userId);
    let allUsers = await User.findAll({
        where: {
            gender: { [Op.notLike]: currentUser.gender }
        }
    });
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
        // if(!dislikedUsersId.includes(user.id)) {
        //     return true;
        // }
        // return false;
    });
    return filteredUsers;
}

exports.rateUser = async function (authUserId, userId, rate) {
    if (userId != null && rate != null) {
        const checkCurrentPref = await UserPref.findOne({
            where: {
                authId: authUserId,
                userId: userId
            }
        });
        // There is already same record with same authId and userId
        if (checkCurrentPref != null) {
            if (rate == 'like') {
                await UserPref.update({
                    status: 'like'
                }, {
                    where: {
                        authId: authUserId,
                        userId: userId
                    }
                });
            } else if (rate == 'dislike') {
                await UserPref.update({
                    status: 'dislike'
                }, {
                    where: {
                        authId: authUserId,
                        userId: userId
                    }
                });
            }
        } else {
            if (rate == 'like') {
                await UserPref.findOrCreate({
                    where: {
                        authId: authUserId,
                        userId: userId,
                        status: 'like'
                    }
                });
            } else if (rate == 'dislike') {
                await UserPref.findOrCreate({
                    where: {
                        authId: authUserId,
                        userId: userId,
                        status: 'dislike'
                    }
                });
            }
        }
    }
}