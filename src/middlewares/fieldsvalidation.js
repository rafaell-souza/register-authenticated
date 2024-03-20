const registrations = require('../../sequelize/models/registrations')
const {passFormat, passLength, nameFormat} = require('../../regex')
const {nameLength, numberFormats, emailFormat, emailLength} = require('../../regex')


module.exports = {

    async FieldsValidation(req, res, next) {

        try {
            const {email, password, passconfirm, number, name} = req.body
            
            if (!name || !password || !passconfirm || !email || !number) {
            return res.status(400).json({ Error: 'All fields must be filled.' })
            }

            //name validation
            if(!nameLength.test(name)){
            return res.status(400).json({error: 'Name must to be between 6 and 40 characters.'})
            }

            if(!nameFormat.test(name)){
            return res.status(400).json({error:'Name only accept letters and spaces'})
            }

            //email validation
            if(!emailLength.test(email)){
            return res.status(400).json({error: 'Email must be between 5 and 250 characters.'})
            }

            if (!emailFormat.test(email)) {
            return res.status(400).json({error: 'Enter a valid email format.'});
            }

            const ifEmailExists = await registrations.findOne({where: {email: email}})
            if(ifEmailExists){  
            return res.status(400).json({error:'Email already registered.'})
            }
            
            //Password validationpass
            if(!passLength.test(password)){
            return res.status(400).json({ error: 'Password must be between 8 and 12 characters.' })
            }

            if(!passFormat.test(password)){
            return res.status(400).json({error: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.'})
            }

            if(password !== passconfirm){
            return res.status(400).json({error: 'Passwords do not match.'})
            }
                
            //Number validation
            if(!numberFormats.test(number)){  // US or brazil number format
            return res.status(404).json({ error: 'Enter a valid number format.'})
            }
            
        next()
        } 
        
        catch (error) {
        console.log(error);
        return res.status(500).json(error);
        }
    }
}