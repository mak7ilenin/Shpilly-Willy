const { DataTypes, Model } = require('sequelize');
const Language = require('./Language');
const { db } = require('../database');

class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: ENUM('male', 'female'),
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        languages: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Language,
                key: 'id',
            }
        },
        professionalStatus: {
            type: DataTypes.ENUM('Secondary', 'Secondary special', 'Incomplete higher', 
            'Higher', 'Academic degree', 'Several higher'),
        },
        familyStatus: {
            type: DataTypes.ENUM('Not married / not married', 'Divorced', 
            'Widower / Widow', 'Other marital status'),
            allowNull: false,
        },
        children: {
            type: DataTypes.ENUM('Have no children', 'Have children'),
            allowNull: false,
        },
        religion: {
            type: DataTypes.ENUM('Atheism', 'Buddhism', 'Hinduism', 
            'Islam', 'Judaism', 'Catholicism', 'Orthodoxy', 'Protestantism', 'Other'),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)
module.exports = User;