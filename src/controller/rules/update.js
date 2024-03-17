const db = require('../../../database/configs');
const registrations = require('../../../sequelize/models/registrations')
const bcrypt = require('bcrypt')

module.exports = {

    
    async updateAll(req, res) {

            const results = {error:'', results:[]};
            const {id} = req.params;
            const {name, password, email, number} = req.body
    
        try {
    
            if(!name || !password || !email || !number){
            results.error = 'All the required fields must to be filled.'
            return res.status(400).json(results.error)
            }
            
            const EmailExists = await registrations.findOne({ where: {email: email}})

            if(EmailExists){
            results.error = 'This email has already benn registered.'
            return res.status(400).json(results.error)
            }

            else {
            const hashedPassword = await bcrypt.hash(password, 10)

            results.results = await registrations.update({
            name: name,
            email: email,
            password: hashedPassword,
            number: number}, {where:{id: id}})
    
            return res.status(200).json(results.results)
            }
    
        } catch (error) {
             console.error(error)
             results.error = 'server internal error.'
             return res.status(500).json(results.results)
        }},
    

    
        async updateSome(req, res) {
        
        const results = {error:'', results:[]};
        const { id } = req.params;
        const {name, email, password, number} = req.body;
    
        try {
            if(!name && !password && !number && !email){
            results.error = 'Please, select any field.'
            return res.status(400).json(results.error);
            };
            
            const EmailExists = await registrations.findOne({ where: {email: email}})

            if(EmailExists){
            results.error = 'This email has already benn registered.'
            return res.status(400).json(results.error)
            }

            const fields = {name, email, number}
            if(password !== undefined){

            const hashedPassword = await bcrypt.hash(password, 10)
            fields.password = hashedPassword}
            const updateFields = {}
    
            Object.keys(fields).forEach(key => {if(fields[key] !== undefined){
            updateFields[key] = fields[key]}} 
            )
    
            if(id){
            results.results = await registrations.update(updateFields, {where:{id: id}})
            return res.status(200).json(results.results)
    
            }
    
        } catch (error) {
            console.error(error)
            results.error = 'server internal error'
            res.status(500).json(results.error)
        }
    
        },
}