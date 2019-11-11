const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
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
