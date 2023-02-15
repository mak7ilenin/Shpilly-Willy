const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/database');

class Country extends Model {}
Country.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        modelName: 'country',
        timestamps: true,
    }
);
module.exports = Country;