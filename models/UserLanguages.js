const { Model, DataTypes } = require('sequelize');
const { db } = require('../config/database');
const User = require('./User');
const Language = require('./Language');

class UserLanguages extends Model {}
UserLanguages.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        languageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Language,
                key: 'id'
            }
        }
    },
    {
        sequelize: db,
        modelName: 'user_languages',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'languageId']
            }
        ]
    }
);
module.exports = UserLanguages;