const connection = require('../database/connection')
const { uuid } = require('uuidv4')

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*')
        return response.json(ongs)
    },

    async create (request, response)  {
        const { name, email, whatsapp, city, uf } = request.body

        const id =  uuid()
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id })
    }
}