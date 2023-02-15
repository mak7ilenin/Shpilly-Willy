const { DataTypes, Model } = require('sequelize');
const { db } = require('../database');

class Language extends Model {}
Language.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'language',
        timestamps: true,
        paranoid: true
    }
)
module.exports = Language;