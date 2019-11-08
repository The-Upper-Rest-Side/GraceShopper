/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../server/db')
const app = require('../server/index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        fName: 'Cody',
        lName: 'ThePug',
        address: '1000 fullstack ave',
        email: codysEmail
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
