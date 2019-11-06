// const isAdminMiddleware = (req, res, next) => {
//   const currentUser = req.user
//   if (currentUser || currentUser.isAdmin) {
//     next()
//   } else {
//     const error = new Error('That action is forbidden!')
//     error.status(401)
//     next(error)
//   }
// }

// module.exports = isAdminMiddleware
