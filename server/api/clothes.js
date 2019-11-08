const router = require('express').Router()
const {Clothes} = require('../db/models')
// const isAdmin = require('../admin.middleware')

router.get('/', async (req, res, next) => {
  try {
    const clothes = await Clothes.findAll({
      attributes: ['name', 'price']
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
    const shirts = await Clothes.findAll({
      where: {
        category: 'Shirts'
      }
    })
    if (shirts) {
      res.json(shirts)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/pants', async (req, res, next) => {
  try {
    const pants = await Clothes.findAll({
      where: {
        category: 'Pants'
      }
    })
    if (pants) {
      res.json(pants)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/shoes', async (req, res, next) => {
  try {
    const shoes = await Clothes.findAll({
      where: {
        category: 'Shoes'
      }
    })
    if (shoes) {
      res.json(shoes)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/hats', async (req, res, next) => {
  try {
    const hats = await Clothes.findAll({
      where: {
        category: 'Hats'
      }
    })
    if (hats) {
      res.json(hats)
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
      res.json(item)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newItem = await Clothes.create(req.body)
    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
