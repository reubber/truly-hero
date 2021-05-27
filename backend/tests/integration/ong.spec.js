const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async()=>{
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async()=> {
    await connection.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app).post('/ongs').send({
      name: "APAD2",
      email: "contato@gmail.com",
      whatsapp: "47000000000",
      city: "bv news",
      uf: "CE"
    })

    expect(response.body).toHaveProperty('id')

  })
})

/** dica: ao testar uma rota que precise do header de autorizacao para setar o header
 * basta da um .set ex: .set('Authorization', '#idvalido') nesse exemplo iria 
 * precisar de uma criação antes para testar
 * 
 * em tests é interessante antes de realizar as migrations é interessante de antes de 
 * excutar as migrations realizar o rollback.
 * 
 * deploy: heroku, maior: digitalOcean
 * 
 * deploy front: netlify,
   */