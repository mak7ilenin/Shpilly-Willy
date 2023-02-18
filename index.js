const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { createDb } = require('./config/database');
const { dbFill } = require('./data/insert_data');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving is running on port ${PORT}`);
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
        require('./routes/registrationRoute')(app, __dirname);
    }, 500);
}
configureDb();