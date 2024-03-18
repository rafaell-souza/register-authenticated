const db = require('../../../database/configs');
const registrations = require('../../../sequelize/models/registrations')

module.exports = {

    async exclude(req, res) {
    
            const {id} = req.params;
        
        try {
            let excludeUser = await registrations.destroy({where: {id: id}})
            return res.status(200).json(excludeUser)
            
    
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    
        }
}