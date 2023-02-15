const express = require('express');
const app = express();
const { createDb, db } = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving is running on port ${PORT}`);
});

async function configureDb() {
    await createDb();
    await db.sync({ alter: true });
}
configureDb();