const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {
  amount: {
    type: Sequelize.FLOAT,
    notNull: true,
    deafultValue: 0
  }
})

module.exports = Transactions
