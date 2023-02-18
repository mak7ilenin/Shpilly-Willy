const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { createDb } = require('./config/database');
const { dbFill } = require('./data/insert_data');
const { unregisteredHeader, loggedHeader } = require('./controllers/headerController');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors());
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
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
 // Render header for logged user
var LGheader = '';
loggedHeader().then(data => {
    LGheader = data;
});

async function configureDb() {
    await createDb();
    setTimeout(async () => {
        // Getting the sequelize instance
        const { db } = require('./config/database');
    
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
        require('./routes/registrationRoute')(app, __dirname, URheader, LGheader);
        require('./routes/homeRoute')(app, URheader, LGheader);
        require('./routes/loginRoute')(app, URheader, LGheader);
        require('./routes/logoutRoute')(app);
    }, 500);
}
configureDb();