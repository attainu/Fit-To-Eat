const {DataTypes}  =require('sequelize')
const db = require('../db')

let admin= db.define(
    'admins',
    {
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps: false
    }
)

module.exports =admin;