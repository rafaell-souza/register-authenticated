const registrations = require('../../sequelize/models/registrations')

module.exports = {

    async FieldsFormats(req, res, next) {

        try {
            const {email, password, number, name} = req.body

            if (!name || !password || !email || !number) {
            return res.status(400).json({ Error: 'All fields must be filled.' })
            }

            //name validation
            if(!/^.{6,40}$/.test(name)){
            return res.status(400).json({error: 'Name must to be between 6 and 40 characters.'})
            }
            if(!/^[a-zA-Z\s]+$/.test(name)){
            return res.status(400).json({error:'Name only accept letters and spaces'})
            }

            //email validation
            if(email.length >250){
            return res.status(400).json({error: 'Email cannot exceed 250 characters.'})
            }
            if (!/^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.(com)$/.test(email)) {
            return res.status(400).json({error: 'Invalid email format.'});
            }

            //it verifies whether the email has already been registered.
            const checkEmail = await registrations.findOne({where: {email: email}})
            if(checkEmail){  
            return res.status(400).json({error:'Email already registered.'})
            }
            
            //Password validation
            if(!/^.{8,12}$/.test(password)){
            return res.status(400).json({ error: 'Password must be between 8 and 12 characters.' })
            }

            if(!/\d([a-zA-Z0-9><=&%$#@!\+\?\*\(\)\.,\[\]\-_\^`~\/\\])/.test(password)){

            return res.status(400).json({error: 'It is recomended to use numbers, letters and specials characters for the password.'})
            }
                
            //Number validation
            if(!/^\(\d{3}\)\s?\d{3}-\d{4}|\(\d{2}\)\s?\d{5}-\d{4}$/.test(number)){  // US and brazil number format
            return res.status(404).json({ error: 'number format invalid.'})
            }
            
        next()
        } 
        
        catch (error) {
        console.log(error);
        return res.status(500).json(error);
        }
    }
}