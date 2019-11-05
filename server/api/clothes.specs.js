const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Clothes} = require('../db/models')

describe('Clothes routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/clothes/', () => {
    const newShoes = 'Nike'

    beforeEach(() => {
      return Clothes.create({
        name: newShoes
      })
    })

    it('GET /api/clothes', async () => {
      const res = await request(app)
        .get('/api/clothes/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].shoes).to.be.equal(newShoes)
    })
  })
})
