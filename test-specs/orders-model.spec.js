const {expect} = require('chai')
const Orders = require('../server/db/models/orders')

describe('Orders model', () => {
  describe('Validations', () => {
    xit('requires `date`', async () => {
      const orders = Orders.build()

      try {
        await orders.validate()
        throw Error(
          'validation was successful but should have failed without `date`'
        )
      } catch (err) {
        expect(err.message).to.contain('date cannot be null')
      }
    })
  })
})
