const { DataTypes } = require('sequelize')
const db = require('../db')

const User = require("./users")

let diet = db.define(
    'diet_plan',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weightInKg: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        heightInCm: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        needMail: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    },
    {
        //     timestamps: false
    }
)

User.hasOne(diet)
diet.belongsTo(User)

module.exports = diet;