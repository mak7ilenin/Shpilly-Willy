const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/database');

class Country extends Model { }
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
        },
        code: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            unique: 'code'
        },
    },
    {
        sequelize: db,
        modelName: 'country',
        timestamps: false,
    }
);
module.exports = Country;