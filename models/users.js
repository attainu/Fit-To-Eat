const {DataTypes}  =require('sequelize')
const db = require('../db')

// const Diet=require('./user-diet-plan')

let users= db.define(
    'users',
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
        // timestamps: false
    }
)

module.exports =users;