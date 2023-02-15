const express = require('express');
const app = express();
const { createDb } = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving is running on port ${PORT}`);
});

async function configureDb() {
    await createDb();
    setTimeout(async () => {
        const { db } = await require('./config/database');
        let Country = require('./models/Country');
        let Language = require('./models/Language');
        let City = require('./models/City');
        let User = require('./models/User');
        let UserLanguages = require('./models/UserLanguages');
        await db.sync({ alter: true });
    }, 100);
}
configureDb();