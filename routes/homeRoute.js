module.exports = (app, URheader, loggedHeader) => {
    const router = require('express').Router();
    const { users } = require('../controllers/homeController');

    // Get all users
    var usersList = [];
    users().then(data => {
        for (let i = 0; i < data.length; i++) {
            usersList.push(data[i]);
        }
    })

    router.get('/', function(req, res) {
        var header = '';
        let cookie = req.session;
        loggedHeader(cookie).then(LGheader => {
            if(cookie.userId != undefined) { header = LGheader } 
            else { header = URheader; cookie = undefined }
    
            res.render('home', {
                header: header,
                users: usersList,
                authUser: cookie
            });
        });
    });

    app.use('/', router);
}