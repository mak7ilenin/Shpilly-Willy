module.exports = (app, loggedHeader) => {
    const router = require('express').Router();
    const { profile, myLanguages } = require('../controllers/profileController');

    router.get('/', function (req, res) {
        if(req.session.userId == undefined) {
            res.redirect('/');
            return;
        }
        profile(req.session).then(user => {
            myLanguages(req.session).then(languages => {
                loggedHeader(req.session).then(header => {
                    res.render('profile', {
                        header: header,
                        authUser: req.session,
                        user: user,
                        
                        languages: languages,
                        educations: ['High school', 'Vocational school', 'Some college', 
                        "Bachelor's / master's", 'Doctoral degree', 'Multiple degrees'],
                        relationshipStatus: ['Single', 'Divorced', 'Widower', 'Other relationship status'],
                        children: ['Do not have children', 'Have children'],
                        religions: ['Atheism', 'Buddhism', 'Hinduism', 
                        'Islam', 'Judaism', 'Catholic Christianity', 'Orthodox Christianity', 'Protestantism', 'Other']
                    });
                });
            })
        });
    });
    router.post('/', async function (req, res) {
        if(req.session.userId == undefined) {
            res.redirect('/');
            return;
        }
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
                { where: { id: req.session.userId } 
            });
            req.session.destroy();
            res.redirect('/');
        }
    });
    app.use('/profile', router);
}