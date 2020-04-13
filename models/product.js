const { DataTypes } = require('sequelize')
const db = require('../db')

let product = db.define(
    'product',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foodType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calorie: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }

)

module.exports = product;