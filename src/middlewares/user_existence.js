const registrations = require('../../sequelize/models/registrations')

module.exports = {

    async UserCheck(req, res, next){
    try {
        const { id } = req.params

        const User = await registrations.findByPk(id)
        
        if(!User){
        return res.status(404).json({ error: "No result found."})
        }

        next()

        } 
    catch (error) {
        res.status(500).json(error)
        }
    }
}