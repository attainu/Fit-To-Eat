const { DataTypes } = require('sequelize')
const db = require('../db')
const User = require('./users')
const Product = require('./product')

let order = db.define(
    'order',
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        }
    }
)

Product.hasMany(order, {
    foreignKey: {
        allowNull: false
    }
})
order.belongsTo(Product)

User.hasMany(order, {
    foreignKey: {
        allowNull: false
    }
})
order.belongsTo(User)

const userOrder = db.define('user_orders')

order.belongsToMany(Product, { through: 'user_orders' })
Product.belongsToMany(order, { through: 'user_orders' })
userOrder.belongsTo(User);
userOrder.belongsTo(order);
User.hasMany(userOrder);
order.hasMany(userOrder)

module.exports = { order, userOrder };