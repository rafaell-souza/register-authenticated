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
            const fields = {}; // it will receive the fields if conditionss ok

            if (name) {
                if(name.length >40){
                return res.status(400).json({error: 'Name cannot exceed 40 characters.'})
                }
                else if(!/[a-zA=Z|\s]$/.test(name)){
                return res.status(400).json({error:'Name only accept letters and spaces'})
                }
            }   fields.name = name;


            if (email) {
                if(email.length >250){
                return res.status(400).json({error: 'Email cannot exceed 250 characters.'})
                }
                else if(!/[a-zA-Z0-9.]@(gmail)\.(com)$/.test(email)){
                return res.status(400).json({error: 'Invalid email format.'})
                }

                else {  //it verifies whether the email has already been registered.
                const checkEmail = await registrations.findOne({where: {email: email}})

                if(checkEmail){     // this 'if' is inside that 'else' above
                return res.status(400).json({error:'Email already registered.'})
                }}
            }   fields.email = email


            if (password) {
                if(password.length <8 || password.length >12){
                return res.status(400).json({ error: 'Password must be between 8 and 12 characters.' })
                }

                else if (!/\d(?=.*[a-zA-Z0-9><=&%$#@!\+\?\*\(\)\.,\[\]\-_\^`~\/\\])/.test(password)) {
                return res.status(400).json({error: 'It is recomended to use numbers, letters and specials characters for the password.'})
                }
                else {const hashedPassword = await bcrypt.hash(password, 10);
                fields.password = hashedPassword}; // password encrypted
            }

            if(number){
                if(!/\(\d{3}\) \d{3}-\d{4}/.test(number)){  // US number format
                return res.status(404).json({ error: 'number must to be in (XXX) XXX-XXXX format.'})
                }
            }   fields.number = number;

            const results = await registrations.create(fields);
            return res.status(201).json(results);
            

        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

}