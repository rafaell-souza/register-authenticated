const db = require('../../../database/configs');
const registrations = require('../../../sequelize/models/registrations')

module.exports = {

    
    async exclude(req, res) {
    
        const {id} = req.params;
        
        try {
            
            const checkId = await registrations.findOne({where: {id: id}})
            if(!checkId){
    
                error = 'Id user not found.'
                return res.status(404).json(error)
            }
            else{
            let excludeId = await registrations.destroy({where: {id: id}})
            return res.status(200).json(
            {message: `${excludeId} user excluded.`})
            }
    
        } catch (error) {
            console.error(error);
            res.status(500).json('Server internal error')
        }
    
        }
}