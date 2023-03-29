const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const { Op } = require('sequelize');
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const path = require('path');
const app = express();
const { dbFill } = require('./data/insert_data');
const { createDb } = require('./config/database');
const { unregisteredHeader, loggedHeader } = require('./controllers/headerController');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors());
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up the session
// 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT);

 // Render header for unlogged user
var URheader = '';
unregisteredHeader().then(data => {
    URheader = data;
});

(async function configureDb() {
    await createDb();
    let intervalCount = 0;
    let interval = setInterval(() => {

        // Getting the sequelize instance
        const { db } = require('./config/database');
        if(db != undefined) {
            if(db == 'NO_XAMPP') {
                clearInterval(interval);
                return;
            }
            init(db);
            clearInterval(interval);
            return;
        } else {
            intervalCount++;
        }
        if(intervalCount >= 50) {
            clearInterval(interval);
            console.log('The database connection has timed out');
        }
        
        async function init(db) {
            let Country = require('./models/Country');
            let Language = require('./models/Language');
            let City = require('./models/City');
            let User = require('./models/User');
            let UserLanguages = require('./models/UserLanguages');
        
            User.belongsToMany(Language, { through: UserLanguages });
            Language.belongsToMany(User, { through: UserLanguages });
    
            // To fill up database
            await db.sync({ alter: true });
            await dbFill();
    
            // Routes
            require('./routes/registrationRoute')(app, __dirname, URheader, loggedHeader);
            require('./routes/homeRoute')(app, URheader, loggedHeader);
            require('./routes/chatsRoute')(app, loggedHeader);
            require('./routes/profileRoute')(app, loggedHeader);
            require('./routes/deleteProfileRoute')(app, loggedHeader);
            require('./routes/editProfileRoute')(app, loggedHeader);
            require('./routes/userProfileRoute')(app, loggedHeader);
            require('./routes/loginRoute')(app, URheader, loggedHeader);
            require('./routes/logoutRoute')(app, URheader);
    
            // Check users deletedAt every 24 hours at 12am
            cron.schedule("0 0 0 * * *", async function() {
                await User.destroy({
                    where: {
                        deletedAt: {[Op.lte]: new Date(Date.now() - (1860 * 60 * 24 * 1000))}
                    },
                    force: true
                });
            });
        }
    }, 100);
})();