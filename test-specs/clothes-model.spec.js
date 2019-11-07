const {expect} = require('chai')
const db = require('../server/db/db')
const Clothes = require('../server/db/models/clothes')

describe('Clothes routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let storedClothes
  const clothesData = [
    {
      name: 'Shimmery Blouse',
      category: 'Shirts',
      price: 30.0,
      size: 4,
      inventory: 4000,
      imageUrl:
        'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQBy01_SYQZnlXRcvET77Iq0v3CSdV7H-68g6pd9RM8Lvy4B3NP9FAcHXr124bJS16JzO-T7AIU4HDP_txB-XAWMIxLrcipVDqXCdmpcapE9W_x3ehe6yiwPQ&usqp=CAE'
    }
  ]
  beforeEach(async () => {
    const createdClothes = await Clothes.bulkCreate(clothesData)
    storedClothes = createdClothes.map(clothes => clothes.dataValues)
  })

  describe('attributes definition', () => {
    it('includes `title` and `content` fields', () => {
      expect(storedClothes[0].name).to.equal('Shimmery Blouse')
      expect(storedClothes[0].category).to.equal('Shirts')
      expect(storedClothes[0].price).to.equal(30)
      expect(storedClothes[0].size).to.equal(4)
      expect(storedClothes[0].inventory).to.equal(4000)
    })

    it('requires `name`', async () => {
      storedClothes[0].name = null

      let result, error
      try {
        result = await storedClothes[0].validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when content is null')

      expect(error).to.be.an.instanceOf(Error)
    })
  })
})
