const express = require('express');
const app = express();
const { createDb, db } = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving is running on port ${PORT}`);
});

// let Country = require('./models/Country');
// let Language = require('./models/Language');
// let City = require('./models/City');
// let User = require('./models/User');
// let UserLanguages = require('./models/UserLanguages');

async function configureDb() {
    await createDb();
    // await db.sync({ alter: true });
}
configureDb();