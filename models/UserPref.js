const { Model, DataTypes } = require('sequelize');
const { db } = require('../config/database');
const User = require('./User');

class UserPref extends Model { }
UserPref.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        authId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        status: {
            type: DataTypes.ENUM('like', 'dislike'),
            allowNull: false,
        }
    },
    {
        sequelize: db,
        modelName: 'user_pref',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['authId', 'userId']
            }
        ]
    }
);
module.exports = UserPref;