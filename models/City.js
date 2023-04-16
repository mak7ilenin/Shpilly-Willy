const { DataTypes, Model } = require('sequelize');
const Country = require('./Country');
const { db } = require('../config/database');

class City extends Model { }
City.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            references: {
                model: Country,
                key: 'code',
            }
        }
    },
    {
        sequelize: db,
        modelName: 'city',
        timestamps: false,
    }
);
module.exports = City;