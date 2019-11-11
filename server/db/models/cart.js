const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = Cart
