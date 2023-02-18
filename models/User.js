const { DataTypes, Model } = require('sequelize');
const Language = require('./Language');
const { db } = require('../config/database');

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
            type: DataTypes.ENUM('male', 'female'),
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
        education: {
            type: DataTypes.ENUM('High school', 'Vocational school', 'Some college', 
            "Bachelor's / master's", 'Doctoral degree', 'Multiple degrees'),
        },
        relationshipStatus: {
            type: DataTypes.ENUM('Single', 'Divorced', 
            'Widower', 'Other relationship status'),
            allowNull: false,
        },
        children: {
            type: DataTypes.ENUM('Do not have children', 'Have children'),
            allowNull: false,
        },
        religion: {
            type: DataTypes.ENUM('Atheism', 'Buddhism', 'Hinduism', 
            'Islam', 'Judaism', 'Catholic Christianity', 'Orthodox Christianity', 'Protestantism', 'Other'),
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize: db,
        modelName: 'user',
        timestamps: true,
        paranoid: true
    }
);
module.exports = User;