const db = require('../../../database/configs');
const registrations = require('../../../sequelize/models/registrations')

module.exports = {

    
    async updateAll(req, res) {

        const results = {error:'', results:[]};
        const {id} = req.params;
        const {name, password, email, number, permission} = req.body
    
        try {
    
            if(!name || !password || !email || !number || !permission){
                results.error = 'All the required fields must to be filled.'
                return res.status(400).json(results.error)
            }
            else {
                results.results = await registrations.update({
                    name: name,
                    email: email,
                    password: password,
                    number: number,
                    permission: permission},
                {where:{id: id}})
    
                return res.status(200).json(results.results)
            }
    
        } catch (error) {
             console.error(error)
             results.error = 'server internal error at put method.'
             return res.status(500).json(results.results)
        }},
    
    
    
    
        async updateSome(req, res) {
        
        const results = {error:'', results:[]};
        const { id } = req.params;
        const {name, email, password, permission, number} = req.body;
    
        try {
            if(!name && !password && !number && !email && !permission){
            results.error = 'Please, select any field.'
            return res.status(400).json(results.error);
            };
            
            const fields = {name, email, password, number, permission}
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