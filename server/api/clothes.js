const router = require('express').Router()
const {Clothes} = require('../db/models')
const isAdmin = require('../admin.middleware')

router.get('/', async (req, res, next) => {
  try {
    const clothes = await Clothes.findAll({
      attributes: ['id', 'name', 'price']
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
})

router.get('/shirts', async (req, res, next) => {

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

module.exports = router
