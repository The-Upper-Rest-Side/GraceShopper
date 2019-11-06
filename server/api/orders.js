const router = require('express').Router()
const {Orders} = require('../db/models')
//const {isAminMiddleware} = require('../admin.middleware')
module.exports = router

//GET all transactions for all users (ADMIN)
router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Orders.findAll()
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

//GET all transactions for a user
router.get('/:userid', async (req, res, next) => {
  try {
    const id = req.params.id
    const orders = await Orders.findAll({
      where: {
        userId: id
      }
    })
    if (!orders) return res.sendStatus(404)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//GET all transactions for a specific date
router.get('/:date', async (req, res, next) => {
  try {
    const date = req.params.date
    const allOrders = await Orders.findAll({
      where: {
        date: date
      }
    })
    if (!allOrders) return res.sendStatus(404)
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

//GET all transactions for a specific date & a specific user
router.get('/:date/:userid', async (req, res, next) => {
  try {
    const date = req.params.date
    const id = req.params.userId
    const allOrders = await Orders.findAll({
      where: {
        date: date,
        userId: id
      }
    })
    if (!allOrders) return res.sendStatus(404)
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

//POST create a new Transaction
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Orders.create(req.body)
    res.json({
      message: 'Created Successfully',
      newOrder
    })
  } catch (err) {
    next(err)
  }
})
