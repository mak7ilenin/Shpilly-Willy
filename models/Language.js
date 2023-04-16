const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/database');

class Language extends Model { }
Language.init(
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
    },
    {
        sequelize: db,
        modelName: 'language',
        timestamps: false,
    }
);
module.exports = Language;