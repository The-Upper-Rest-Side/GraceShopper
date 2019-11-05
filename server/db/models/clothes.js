const Sequelize = require('sequelize')
const db = require('../db')

const Clothes = db.define('clothes', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
/*should the size be number or letter. availability boolean?*/

module.exports = Clothes
