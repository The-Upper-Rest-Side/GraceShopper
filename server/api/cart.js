const router = require('express').Router()
const {Clothes, User, Cart} = require('../db/models')
const isAdmin = require('../admin.middleware')

//PUT add to cart
router.put('/:id', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const clotheId = req.params.id
    const user = await User.findByPk(userId)
    const clothe = await Clothes.findByPk(clotheId)

    if (clothe.inventory === 0) return res.send('Out of Stock!')

    await Clothes.update(
      {
        inventory: clothe.inventory - 1
      },
      {
        where: {
          id: clotheId
        }
      }
    )

    await user.addClothe(clothe)

    const cartRow = await Cart.findOne({
      where: {
        userId,
        clotheId
      }
    })

    const newQuant = ++cartRow.dataValues.quantity

    await Cart.update(
      {
        quantity: newQuant
      },
      {
        where: {
          userId,
          clotheId
        }
      }
    )

    res.send(
      `Added to cart! Now you have ${newQuant} ${
        clothe.dataValues.name
      }(s) in your cart.`
    )
  } catch (error) {
    next(error)
  }
})

//DELETE remove from cart
router.delete('/:id/cart', async (req, res, next) => {
  try {
    const userId = 2 //use for testing
    // const userId = req.session.passport.user
    const clotheId = req.params.id
    const user = await User.findByPk(userId)
    const clothe = await Clothes.findByPk(clotheId)

    await Clothes.update(
      {
        inventory: clothe.inventory + 1
      },
      {
        where: {
          id: clotheId
        }
      }
    )

    const cartRow = await Cart.findOne({
      where: {
        userId,
        clotheId
      }
    })

    let quantity = cartRow.dataValues.quantity
    console.log('before', quantity)
    quantity--
    if (quantity) {
      await Cart.update(
        {
          quantity: quantity
        },
        {
          where: {
            userId,
            clotheId
          }
        }
      )
    } else await user.removeClothe(clothe)

    console.log('after', quantity)

    res.send('Removed from cart!')
  } catch (error) {
    next(error)
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

module.exports = router
