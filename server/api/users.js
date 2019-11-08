const router = require('express').Router()
const {User} = require('../db/models')
const {Orders} = require('../db/models')
const adminMiddleware = require('../admin.middleware')
module.exports = router

router.get('/', adminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const orders = await Orders.findAll({
      where: {
        userId
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/me', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const me = await User.findOne({
      where: {
        id: userId
      }
    })
    res.json(me)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', adminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],
      where: {
        id: req.params.id
      }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    const allOrders = await Orders.findAll({
      where: {
        userId: req.session.passport.userId
      }
    })
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})
