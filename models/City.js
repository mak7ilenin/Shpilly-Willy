const { DataTypes, Model } = require('sequelize');
const Country = require('./Country');
const { db } = require('../config/database');

class City extends Model {}
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
        city: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Country,
                key: 'id',
            }
        }
    },
    {
        sequelize: db,
        modelName: 'city',
        timestamps: true,
        paranoid: true
    }
);
module.exports = City;