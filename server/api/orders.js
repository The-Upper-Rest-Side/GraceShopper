const router = require('express').Router()
const {Orders, Clothes} = require('../db/models')
const isAdminMiddleware = require('../admin.middleware')
module.exports = router

//GET all orders for all users
router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const allOrders = await Orders.findAll()
    res.status(200).json(allOrders)
  } catch (err) {
    next(err)
  }
})

//GET all orders for a single user
router.get('/:userid', isAdminMiddleware, async (req, res, next) => {
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
router.get('/:date', isAdminMiddleware, async (req, res, next) => {
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
router.get('/:date/:userid', isAdminMiddleware, async (req, res, next) => {
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

//POST create a new order, can be accessed by both user & admin
router.post('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    req.body.userId = userId
    const newOrder = await Orders.create(req.body)

    res.status(201).json({
      message: 'Created Successfully',
      newOrder
    })
  } catch (err) {
    next(err)
  }
})

//PUT update an order to reflect checkout
router.put('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    req.body.userId = userId
    const newOrder = await Orders.create(req.body)

    res.status(201).json({
      message: 'Created Successfully',
      newOrder
    })
  } catch (err) {
    next(err)
  }
})
