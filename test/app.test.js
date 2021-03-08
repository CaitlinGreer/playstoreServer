const supertest = require('supertest')
const app = require('../app')
const { expect } = require('chai')

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1)
                const app = res.body[0]
                expect(app).to.include.all.keys(
                    'Category', 'Price', 'Type', 'Genres'
                )
            })
    })
    it('should return 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/books')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be either a rating or app')
    })
}) 