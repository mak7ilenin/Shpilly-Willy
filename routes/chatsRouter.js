module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const User = require('../models/User');
    const { users, filter } = require('../controllers/chatsController');

    
    router.get('/', async (req, res) => {
        if(req.session.userId == undefined) {
            res.redirect('/');
            return;
        } else {
            const usersList = await User.findAll();
            for (let i = 0; i < usersList.length; i++) {
                let nm_date = (usersList[i].birthDate).replace('-', '/').replace('-', '/');
                let date = new Date(nm_date);
                let month_diff = Date.now() - new Date(date);
                let age_dt = new Date(month_diff); 
                let year = age_dt.getUTCFullYear();
                let age = Math.abs(year - 1970);
                usersList[i].age = age;
            }
            loggedHeader(req.session).then(header => {
                // Get all users of the opposite sex
                res.render('chats', {
                    header: header,
                    users: usersList,
                    authUser: req.session,
                    message: ''
                });
            });
        }
    });

    router.post('/', async (req, res) => {
        if(!req.body.age && !req.body.lookingFor && !req.body.country && !req.body.city) {
            let users = await User.findAll();
            for (let i = 0; i < users.length; i++) {
                let nm_date = (users[i].birthDate).replace('-', '/').replace('-', '/');
                let date = new Date(nm_date);
                let month_diff = Date.now() - new Date(date);
                let age_dt = new Date(month_diff); 
                let year = age_dt.getUTCFullYear();
                let age = Math.abs(year - 1970);
                users[i].age = age;
            }
            loggedHeader(req.session).then(header => {
                res.status(404).render('chats', {
                    header: header,
                    users: users,
                    message: 'Please fill in at least one field!'
                });
            });
            return;
        }
        console.log(req.body);
        loggedHeader(req.session).then(header => {
            filter(
                req.body.age, req.body.lookingFor, 
                req.body.country, req.body.city
            ).then(data => {
                res.render('chats', {
                    header: header,
                    users: data,
                    authUser: req.session,
                    message: ''
                });
            });
        })
    });
    app.use('/chats', router);
}