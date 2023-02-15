const { DataTypes, Model } = require('sequelize');
const Country = require('./Country');
const { db } = require('../database');

class City extends Model {}
City.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
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
)
module.exports = City;