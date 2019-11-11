const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  clotheId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Orders
