const db = require('../../../database/configs');
const registrations = require('../../../sequelize/models/registrations')

module.exports = {

    
        async GetAll(req, res) {

                const results = {error: '', results:[]};
    
            try {
                results.results = await registrations.findAll();
                return res.status(200).json(results.results);
                
            } catch (error) {
                results.error = 'Server Internal error.'
                console.error(error);
                res.status(500).json(results.error);
            }
        },
    

        async GetOne(req, res) {
    
        const results = {error: '', results:[]};
        const {id} = req.params
    
            try {
                const checkId = await registrations.findOne({ where: {id: id}})
    
                if(!checkId) {
                results.error = "User not found."
                return res.status(404).json(results.error)
                }
    
                if(checkId) {
                results.results = await registrations.findByPk(id)
                return res.status(200).json(results.results)
                }
    
    
            } catch (error) {
                console.error(error);
                results.error = 'Server internal error'
                return res.status(500).json({error: results.error})
            }
        },
    
}