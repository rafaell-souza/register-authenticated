const db = require('../../../database/configs');
const registrations = require('../../../sequelize/models/registrations')
const bcrypt = require('bcrypt')

module.exports = {

    async create(req, res) {
        const { name, password, email, number} = req.body;

        try {
            if (!name || !password || !email || !number) {
                return res.status(400).json({ Error: 'All fields must be filled.' })
            }

            // fields validation
            const fields = {};

            if (name.length > 40) {
                return res.status(400).json({ error: 'Name cannot exceed 40 characters.' })
            }
            if (!/^[a-zA-Z\s]+$/.test(name)) {
                return res.status(400).json({ error: 'Name can only accept letters' })
            }
            fields.name = name;

            if (email.length > 250) {
                return res.status(400).json({ error: 'Email cannot exceed 250 characters.' })
            }
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email)) {
                return res.status(400).json({ error: 'Invalid email format.' })
            }

            const checkEmail = await registrations.findOne({where: {email: email}})
            if(checkEmail){
                return res.status(400).json({ error: 'This email already exists'})
            }

            fields.email = email;

            if (password.length < 8 || password.length > 12) {
                return res.status(400).json({ error: 'Password must be between 8 and 12 characters.' })
            }
            if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
                return res.status(400).json({ error: 'Password must contain at least one digit and one letter.' })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            fields.password = hashedPassword;

            
            if(!/\(\d{3}\) \d{3}-\d{4}/.test(number)){
                return res.status(404).json({ error: 'invalid number format'})
            }
            fields.number = number;

            const results = await registrations.create(fields);
            return res.status(201).json(results);

        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

}