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
    connection.query('SHOW DATABASES WHERE `database` = "shpily_willy"', 
        function(err, result) {
            if(result.length != 0) {
                console.log('The database has already been created!');
            } else {
                connection.query(`CREATE DATABASE shpily_willy`, 
                    function(err, result) {
                        if(err == null) {
                            createSeqConnection();
                        }
                    });
            }
        });

    // Close the connection
    setTimeout(() => { connection.end() }, 2000);
}

// Create sequelize connection
function createSeqConnection() {
    const sequelize = new Sequelize('shpily_willy', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
    });
    module.exports.db = sequelize;
}