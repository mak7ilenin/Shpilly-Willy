const { DataTypes, Model } = require('sequelize');
const { db } = require('../database');

class Country extends Model {}
Country.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        modelName: 'country',
        timestamps: true,
        paranoid: true
    }
)
module.exports = Country;