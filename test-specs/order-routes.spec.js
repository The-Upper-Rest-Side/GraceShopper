const expect = require('chai').expect
const request = require('supertest')

const app = require('../server')
const agent = request.agent(app)

const db = require('../server/db/db')
const Orders = require('../server/db/models/orders')

describe('Orders Routes:', () => {
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
    return Promise.all([Orders.truncate({cascade: true})])
  })

  describe('GET /orders', () => {
    xit('responds with all orders in DB', async () => {
      await Orders.create({
        date: new Date('August 19, 1975 23:15:30'),
        amount: 1.11
      })

      await Orders.create({
        date: new Date('August 18, 1975 23:15:30'),
        amount: 2.11
      })

      const res = await agent.get('/api/orders').expect(200)

      // res.body is the JSON return object
      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body[0].amount.toString()).to.equal('1.11')
      expect(res.body.length).to.equal(2)
    })
  })
  describe('POST /orders', () => {
    xit('creates a new order', async () => {
      const res = await agent
        .post('/api/orders')
        .send({
          date: new Date('August 18, 1975 23:15:30'),
          amount: 2.11
        })
        .expect(201)

      expect(res.body.message).to.equal('Created Successfully')
      expect(res.body.newOrder.id).to.not.be.an('undefined')
      expect(res.body.newOrder.amount.toString()).to.equal('2.11')
    })
  })
})
