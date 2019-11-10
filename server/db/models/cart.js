const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define(
  'cart',
  {
    isCart: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    hooks: {
      afterCreate: cart => {
        cart.quantity++
      }
    }
  }
)

module.exports = Cart
