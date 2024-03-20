const registrations = require('../../../sequelize/models/registrations')
const bcrypt = require('bcrypt')

module.exports = {

    
    async updateAll(req, res) {
    try {
      
        const {id} = req.params;
        const {name, password, email, number} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        const dataUpadates = await registrations.update({

        name: name,
        password: hashedPassword,
        email: email,
        number: number}, {where:{id: id}}
        )

        return res.status(201).json(dataUpadates);
        } 

    catch (error) {
        console.log(error);
        return res.status(500).json(error);
        }
    }
}