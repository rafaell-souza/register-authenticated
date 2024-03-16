const db = require('../../../database/configs');
const registrations = require('../../../sequelize/models/registrations')

module.exports = {

    async create(req, res) {

        const results = {error:'', results: []}
        const {name, password, email, number, permission} = req.body;
    
            try {
                if(!name || !password || !email || !number) {
                results.error = 'Please, make sure to fill the required fields.'
                return res.status(400).json(results.error)
                }
    
                const checkEmail = await registrations.findOne(
                {where:{email: email}})
    
                if(checkEmail) {
                results.error = 'This email has already been registered'
                return res.status(400).json(results.error)
                }
                else {
                results.results = await registrations.create({
                name: name, email: email, 
                password: password, number: number,
                permission: permission || 'standard'})
    
                return res.status(201).json(results.results)
                }
                
    
            } catch (error) {
                console.log(error)
                results.error = 'Server internal error'
                return res.status(500).json(results.error)
            }
        }

}