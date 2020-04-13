const { DataTypes } = require('sequelize')
const db = require('../db')

const User=require('./users')

let feedback=db.define(
    'customer_feedback',
    {
        rating:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        message:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    }
)

User.hasMany(feedback)
feedback.belongsTo(User)

module.exports = feedback
