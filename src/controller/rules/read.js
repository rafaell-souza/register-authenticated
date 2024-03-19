registrations = require('../../../sequelize/models/registrations')
const { UserExistence } = require('../../middlewares/user_existence')


module.exports = {

        async GetAll(req, res) {
    
        try {
            allUsers = await registrations.findAll();
            return res.status(200).json(allUsers);
            }
            
        catch (error) {
            console.error(error);
            return res.status(500).json(error);
            }
        },


        async GetOne(req, res) {

        try {

            const { id } = req.params
            const userById = await registrations.findByPk(id);

            return res.status(200).json(userById);
            } 

        catch (error) {
            console.error(error);
            return res.status(500).json({error: error});
            }
        }

}