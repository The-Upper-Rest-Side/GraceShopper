const router = require('express').Router()
const {User} = require('../db/models')
const {Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
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
