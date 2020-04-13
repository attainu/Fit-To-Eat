const { DataTypes } = require('sequelize')
const db = require('../db')

const User = require("./users")

let catering = db.define(
    'catering',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pax: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: DataTypes.CHAR(10),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
)

User.hasMany(catering)
catering.belongsTo(User)

module.exports = catering;