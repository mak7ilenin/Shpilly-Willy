const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

module.exports.createDb = async function createDb() {
    // Create connection to MySQL
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    });

    // Create database if not exist
    connection.query(`CREATE DATABASE IF NOT EXISTS shpily-willy`);

    // Close the connection
    connection.end();
}

// Create sequelize connection
try {
    const sequelize = new Sequelize('shpily-willy', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
    });
    module.exports.db = sequelize;
} catch (error) {
    createDb()
        .then(() => {
            const sequelize = new Sequelize('shpily-willy', 'root', '', {
                host: 'localhost',
                dialect: 'mysql'
            });
            module.exports.db = sequelize;
        });
}