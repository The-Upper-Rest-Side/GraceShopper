const db = require('./db')

const isAdminMiddleware = async (req, res, next) => {
  const userId = req.session.passport.user
  const user = await db.models.user.findOne({where: {id: userId}})
  if (user.dataValues.isAdmin) {
    next()
  } else {
    const error = new Error('That action is forbidden!')
    next(error)
  }
}

module.exports = isAdminMiddleware
