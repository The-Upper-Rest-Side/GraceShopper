const router = require('express').Router()
const {Orders, Cart, Transactions} = require('../db/models')
const isAdminMiddleware = require('../admin.middleware')
module.exports = router

//GET all orders for all users
router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const alltransactions = await Transactions.findAll()
    res.status(200).json(alltransactions)
  } catch (err) {
    next(err)
  }
})

//GET all orders for a single user
router.get('/:userid', isAdminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id
    const transactions = await Transactions.findAll({
      where: {
        userId: id
      }
    })
    if (!transactions) return res.sendStatus(404)
    const orders = []
    transactions.forEach(async transaction => {
      const order = await Orders.findAll({
        where: {
          transactionId: transaction.dataValues.id
        }
      })
      orders.push(order)
    })

    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
})

//GET all orders for a specific date
router.get('/:date', isAdminMiddleware, async (req, res, next) => {
  try {
    const date = req.params.date
    const alltransactions = await Transactions.findAll({
      where: {
        date: date
      }
    })
    if (!alltransactions) return res.sendStatus(404)
    res.status(200).json(alltransactions)
  } catch (err) {
    next(err)
  }
})

//GET all orders for a specific date & a specific user
router.get('/:date/:userid', isAdminMiddleware, async (req, res, next) => {
  try {
    const date = req.params.date
    const id = req.params.userId
    const alltransactions = await Transactions.findAll({
      where: {
        date: date,
        userId: id
      }
    })
    if (!alltransactions) return res.sendStatus(404)
    res.status(200).json(alltransactions)
  } catch (err) {
    next(err)
  }
})

//POST create a new order & change isCart to false
router.post('/checkout', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const newTransaction = await Transactions.create({userId})

    const itemsInCart = await Cart.findAll({
      where: {
        userId
      }
    })

    // console.log('>>>>>>itemsInCart', itemsInCart[0])
    itemsInCart.forEach(async element => {
      // req.body.clotheId = element.dataValues.clotheId;
      // req.body.quantity = element.dataValues.quantity
      const quantity = element.dataValues.quantity
      const clotheId = element.dataValues.clotheId

      await Orders.create({quantity, userId, clotheId})
    })

    // res.status(201).json({
    //   message: 'Order Created Successfully',
    //   newOrder
    // })
    res.send('what we got')
  } catch (err) {
    next(err)
  }
})
