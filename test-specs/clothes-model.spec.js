const {expect} = require('chai')
const db = require('../server/db/index')
const Clothes = require('../server/db/models/clothes')

describe('The `Clothes` model', () => {
  before(() => {
    return db.sync({force: true})
  })

  let clothingItem
  beforeEach(() => {
    clothingItem = Clothes.build({
      name: 'Shimmery Blouse',
      cateogry: 'Shirts',
      price: 30,
      size: 4,
      inventory: 4000
    })
  })

  afterEach(() => {
    return Promise.all([
      Clothes.truncate({cascade: true}),
      Clothes.truncate({cascade: true})
    ])
  })

  describe('attributes definition', () => {
    it('includes `title` and `content` fields', async () => {
      const savedClothingItem = await clothingItem.save()
      expect(savedClothingItem.name).to.equal('Shimmery Blouse')
      expect(savedClothingItem.category).to.equal('Shirts')
      expect(savedClothingItem.price.to.equal(30))
      expect(savedClothingItem.size).to.equal(4)
      expect(savedClothingItem.inventory.to.equal(4000))
    })

    it('requires `name`', async () => {
      clothingItem.name = null

      let result, error
      try {
        result = await clothingItem.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when content is null')

      expect(error).to.be.an.instanceOf(Error)
    })
  })
})
