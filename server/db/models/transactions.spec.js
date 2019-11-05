const {expect} = require('chai')
const db = require('../index')
const Transactions = require('./transactions')

describe('Transactions model', () => {
  describe('Validations', () => {
    it('requires `date`', async () => {
      const transactions = Transactions.build()

      try {
        await transactions.validate()
        throw Error(
          'validation was successful but should have failed without `date`'
        )
      } catch (err) {
        expect(err.message).to.contain('date cannot be null')
      }
    })
  })
})
