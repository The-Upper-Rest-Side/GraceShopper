const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transactions', {})

module.exports = Transactions
