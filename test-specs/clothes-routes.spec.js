const {expect} = require('chai')
const request = require('supertest')
const app = require('../server/index')
const agent = request.agent(app)
const db = require('../server/db/db')
const Clothes = require('../server/db/models/clothes')

describe('Clothes routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let storedClothes

  const clothesData = [
    {
      name: 'Nike',
      category: 'Shoes',
      price: 20.0,
      size: 8,
      inventory: 3
    },
    {
      name: 'Vans',
      category: 'Shoes',
      price: 50.0,
      size: 8,
      inventory: 5
    }
  ]

  beforeEach(async () => {
    const createdClothes = await Clothes.bulkCreate(clothesData)
    storedClothes = createdClothes.map(clothes => clothes.dataValues)
  })

  describe('GET `/api/clothes`', () => {
    it('serves up all clothes', async () => {
      const response = await agent.get('/api/clothes').expect(200)
      expect(response.body).to.have.length(2)
      expect(response.body[0].name).to.equal(storedClothes[0].name)
    })
  })

  describe('GET `/api/clothes/:id`', () => {
    it('serves up a single clothing item by its id', async () => {
      const response = await agent.get('/api/clothes/1').expect(200)
      expect(response.body.name).to.equal('Nike')
    })
  })
})
