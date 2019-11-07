'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Clothes} = require('../server/db/models')
const {Orders} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      fName: 'Cody',
      lName: 'thePug',
      address: '1000 fullstack ave',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      fName: 'CodyBreo',
      lName: 'theBull',
      address: '150 fullstack ave',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const clothes = await Promise.all([
    Clothes.create({
      name: 'Crop Top',
      category: 'Shirts',
      price: 20,
      size: 4,
      inventory: 1000
    }),
    Clothes.create({
      name: 'Mom Jeans',
      category: 'Pants',
      price: 50,
      size: 2,
      inventory: 1000
    })
  ])

  const orders = await Promise.all([
    Orders.create({
      date: new Date('August 20, 1975 23:15:30'),
      amount: 1.0
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${clothes.length} clothes`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
