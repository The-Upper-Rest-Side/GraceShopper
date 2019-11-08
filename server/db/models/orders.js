const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notEmpty: true
    }
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Orders
