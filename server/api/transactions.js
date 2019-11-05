const router = require('express').Router()
const {Transactions} = require('../db/models')
//const {isAminMiddleware} = require('../admin.middleware')
module.exports = router

//GET all transactions for all users (ADMIN)
router.get('/', async (req, res, next) => {
  try {
    const allTransactions = await Transactions.findAll()
    res.json(allTransactions)
  } catch (err) {
    next(err)
  }
})

//GET all transactions for a user
router.get('/:userid', async (req, res, next) => {
  try {
    const id = req.params.id
    const transactions = await Transactions.findAll({
      where: {
        userId: id
      }
    })
    if (!transactions) return res.sendStatus(404)
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})

//GET all transactions for a specific date
router.get('/:date', async (req, res, next) => {
  try {
    const date = req.params.date
    const allTransactions = await Transactions.findAll({
      where: {
        date: date
      }
    })
    if (!allTransactions) return res.sendStatus(404)
    res.json(allTransactions)
  } catch (err) {
    next(err)
  }
})

//GET all transactions for a specific date & a specific user
router.get('/:date/:userid', async (req, res, next) => {
  try {
    const date = req.params.date
    const id = req.params.userId
    const allTransactions = await Transactions.findAll({
      where: {
        date: date,
        userId: id
      }
    })
    if (!allTransactions) return res.sendStatus(404)
    res.json(allTransactions)
  } catch (err) {
    next(err)
  }
})

//POST create a new Transaction
router.post('/', async (req, res, next) => {
  try {
    const newTransaction = await Transactions.create(req.body)
    res.json({
      message: 'Created Successfully',
      newTransaction
    })
  } catch (err) {
    next(err)
  }
})
