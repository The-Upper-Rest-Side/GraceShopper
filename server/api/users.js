const router = require('express').Router()
const {User, Orders, Cart, Clothes, Transactions} = require('../db/models')
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
    const cartClothes = []
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i]
      const clothe = await Clothes.findOne({
        where: {id: element.dataValues.clotheId}
      })
      cartClothes.push({
        ...clothe.dataValues,
        quantity: element.dataValues.quantity
      })
    }
    res.status(200).json(cartClothes[0])
  } catch (error) {
    next(error)
  }
})
router.get('/transactions', async (req, res, next) => {
  try {
    // const id = req.sessions.passport.user
    const id = 2
    const transactions = await Transactions.findAll({
      where: {
        userId: id
      }
    })
    if (!transactions) return res.sendStatus(404)
    const orders = []
    for (let i = 0; i < transactions.length; i++) {
      const elem = transactions[i]
      const order = await Orders.findAll({
        where: {
          transactionId: elem.dataValues.id
        }
      })
      orders.push(...order)
    }
    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
})
router.put('/me', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    await User.update(req.body, {where: {id: userId}})

    res.json({...req.body, id: userId})
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
