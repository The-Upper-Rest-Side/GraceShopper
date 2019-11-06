const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      notEmpty: true
    }
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Transactions
