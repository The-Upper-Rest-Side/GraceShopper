const expect = require('chai').expect
const request = require('supertest')

const app = require('../server')
const agent = request.agent(app)

const db = require('../server/db/db')
const Transactions = require('../server/db/models/transactions')

describe('Transactions Routes:', () => {
  /**
   * First we clear the database before beginning each run
   */
  before(() => {
    return db.sync({force: true})
  })

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(() => {
    return Promise.all([Transactions.truncate({cascade: true})])
  })

  describe('GET /transactions', () => {
    it('responds with all transaction in DB', async () => {
      await Transactions.create({
        date: new Date('August 19, 1975 23:15:30'),
        amount: 1.0
      })

      await Transactions.create({
        date: new Date('August 18, 1975 23:15:30'),
        amount: 2.0
      })

      const res = await agent.get('/api/transactions').expect(200)

      // res.body is the JSON return object
      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body[0].amount.toString()).to.equal('1.00')
      expect(res.body.length).to.equal(2)
    })
  })
  describe('POST /transactions', () => {
    it('creates a new transaction', async () => {
      const res = await agent
        .post('/api/transactions')
        .send({
          date: new Date('August 18, 1975 23:15:30'),
          amount: 2.0
        })
        .expect(200)

      expect(res.body.message).to.equal('Created Successfully')
      expect(res.body.newTransaction.id).to.not.be.an('undefined')
      expect(res.body.newTransaction.amount.toString()).to.equal('2.00')
    })
  })
})
