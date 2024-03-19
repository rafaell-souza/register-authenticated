const registrations = require('../../../sequelize/models/registrations')
const bcrypt = require('bcrypt')

module.exports = {

    async create(req, res) {
    try {
            
        const {name, password, email, number} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await registrations.create({
        name: name,
        number: number,
        password: hashedPassword,
        email: email
        })

        res.status(201).json(newUser)

        } 
        catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

}