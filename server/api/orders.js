const router = require('express').Router()
const {Orders} = require('../db/models')
//const {isAminMiddleware} = require('../admin.middleware')
module.exports = router

//All ADMIN Routes

//GET all orders for all users
router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Orders.findAll()
    res.status(200).json(allOrders)
  } catch (err) {
    next(err)
  }
})

//GET all orders for a single user
router.get('/:userid', async (req, res, next) => {
  try {
    const id = req.params.id
    const orders = await Orders.findAll({
      where: {
        userId: id
      }
    })
    if (!orders) return res.sendStatus(404)
    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
})

//GET all orders for a specific date
router.get('/:date', async (req, res, next) => {
  try {
    const date = req.params.date
    const allOrders = await Orders.findAll({
      where: {
        date: date
      }
    })
    if (!allOrders) return res.sendStatus(404)
    res.status(200).json(allOrders)
  } catch (err) {
    next(err)
  }
})

//GET all orders for a specific date & a specific user
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
    res.status(200).json(allOrders)
  } catch (err) {
    next(err)
  }
})

//POST create a new order
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Orders.create(req.body)
    res.status(201).json({
      message: 'Created Successfully',
      newOrder
    })
  } catch (err) {
    next(err)
  }
})
