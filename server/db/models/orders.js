const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notEmpty: true
    },
    defaultValue: new Date()
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Orders
