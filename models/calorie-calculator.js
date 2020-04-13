const {DataTypes}  =require('sequelize')
const db = require('../db')

let calculator=db.define(
    'calorie_calculator',
    {
        age:{
            type:DataTypes.STRING,
            allowNull:false
        },
        weightInKg:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        heightInCm:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        gender:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        activity:{
            type:DataTypes.STRING,
            allowNull:true
        }
    }
)

module.exports=calculator;