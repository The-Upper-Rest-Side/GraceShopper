const router = require('express').Router()
const {User} = require('../db/models')
const {Transactions} = require('../db/models')
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

router.get('/transactions', async (req, res, next) => {
  try {
    const allTransactions = await Transactions.findAll({
      where: {
        userId: req.session.userId
      }
    })
    res.json(allTransactions)
  } catch (err) {
    next(err)
  }
})
