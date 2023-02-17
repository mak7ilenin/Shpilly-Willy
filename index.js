const express = require('express');
const cors = require('cors');
const app = express();
const { createDb } = require('./config/database');
const { dbFill } = require('./data/insert_data');
const { getDbData } = require('./controllers/registrationController');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/registartionRoute')(app);

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
    
        // await db.sync({ alter: true });
        // await dbFill();
        await getDbData();
    }, 500);
}
configureDb();