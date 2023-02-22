module.exports = (app, URheader) => {
    const sequelize = require('sequelize');
    const router = require('express').Router();
    const { users } = require('../controllers/homeController');
    const User = require('../models/User');

    // Get all users
    let usersList = [];
    users().then(data => {
        for (let i = 0; i < data.length; i++) {
            usersList.push(data[i]);
        }
    });
    
    router.get('/', async function (req, res) {
        if(req.session.userId != undefined) {
            let date = new Date();
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let day = String(date.getDate()).padStart(2, '0');
            let hours = String(date.getHours());
            let minutes = String(date.getMinutes());
            let seconds = String(date.getSeconds());
            let dateNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            await User.update({ 
                deletedAt: dateNow }, 
                { where: { id: req.session.profileId } 
            });
            req.session.destroy();
            res.redirect('/');
        }
    });
    app.use('/profile/delete', router);
}