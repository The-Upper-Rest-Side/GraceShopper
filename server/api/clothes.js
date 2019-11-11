const router = require('express').Router()
const {Clothes, User, Cart} = require('../db/models')
const isAdmin = require('../admin.middleware')

router.get('/', async (req, res, next) => {
  try {
    const clothes = await Clothes.findAll({
      attributes: ['id', 'name', 'price', 'size', 'imageUrl']
    })
    res.json(clothes)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Clothes.findByPk(req.params.id)
    if (item) {
      res.status(200).json(item)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
}) // CHANGED '/shirts'  to '/:type' because path is for all types of clothes not just shirts - SIMON G.
router.get('/:type', async (req, res, next) => {
  try {
    const type = req.params.type
    const selectedCategory = await Clothes.findAll({
      where: {
        category: type
      }
    })
    if (selectedCategory) {
      res.status(200).json(selectedCategory)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Clothes.findByPk(req.params.id)
    if (item) {
      res.status(200).json(item)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newItem = await Clothes.create(req.body)
    res.status(200).json(newItem)
  } catch (error) {
    next(error)
  }
})

//PUT add to cart
router.put('/:id/cart', async (req, res, next) => {
  try {
    const userId = 2 //use for testing
    // const userId = req.session.passport.user
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

module.exports = router
