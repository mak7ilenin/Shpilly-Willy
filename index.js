const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
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
        // await db.sync({ alter: true });
        // await dbFill();

        // Routes
        require('./routes/registrationRoute')(app, __dirname, URheader, loggedHeader);
        require('./routes/homeRoute')(app, URheader, loggedHeader);
        require('./routes/chatsRouter')(app, loggedHeader);
        require('./routes/profileRoute')(app, loggedHeader);
        require('./routes/editProfileRoute')(app, loggedHeader);
        require('./routes/userProfileRouter')(app, loggedHeader);
        require('./routes/loginRoute')(app, URheader, loggedHeader);
        require('./routes/logoutRoute')(app, URheader);
    }, 500);
}
configureDb();