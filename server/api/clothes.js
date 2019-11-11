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
    const clothesId = req.params.id
    const user = await User.findByPk(userId)
    const clothe = await Clothes.findByPk(clothesId)

    if (clothe.inventory === 0) return res.send('Out of Stock!')

    Clothes.update(
      {
        inventory: clothe.inventory - 1
      },
      {
        where: {
          id: clothesId
        }
      }
    )

    user.addClothe(clothe)

    // Cart needs to show how many items bought, need to update quantity everytime added to cart, hook?- SIMON G.

    res.send('Added to cart!')
  } catch (error) {
    next(error)
  }
})

//DELETE remove from cart
router.delete('/:id/cart', async (req, res, next) => {
  try {
    // const userId = 2 //use for testing
    const userId = req.session.passport.user
    const clothesId = req.params.id
    const user = await User.findByPk(userId)
    const clothe = await Clothes.findByPk(clothesId)

    Clothes.update(
      {
        inventory: clothe.inventory + 1
      },
      {
        where: {
          id: clothesId
        }
      }
    )

    user.removeClothe(clothe)

    res.send('Removed from cart!')
  } catch (error) {
    next(error)
  }
})

module.exports = router
