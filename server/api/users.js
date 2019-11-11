const router = require('express').Router()
const {User, Orders, Cart, Clothes} = require('../db/models')
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

//GET all items in a users cart
router.get('/cart', async (req, res, next) => {
  try {
    // const userId = 2; //Use to test
    const userId = req.session.passport.user
    const cart = await Cart.findAll({
      where: {
        userId: userId
      }
    })

    if (!cart.length) return res.send('Cart is empty') //What do we want to send if nothing is in cart? - SIMON G.
    res.status(200).json(cart)
  } catch (error) {
    next(error)
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
