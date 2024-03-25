import registrations from '../sequelize/models/registrations.js'
import regex from '../fields-format.js'


export async function VerifyFields(request, response, next) {
    try {
        const {email, password, passconfirm, number, name} = request.body
            
        if (!name || !password || !passconfirm || !email || !number) {
        return response.status(400).json({ Error: 'All fields must be filled.' })
        }

        //name validation
        if(!regex.nameLength.test(name)){
        return response.status(400).json({error: 'Name is 6 to 40 characters.'})
        }

        if(!regex.nameFormat.test(name)){
        return response.status(400).json({error:'Name accepts only letters'})
        }

        //email validation
        if(!regex.emailLength.test(email)){
        return response.status(400).json({error: 'Email is 5 to 250 characters.'})
        }

        if (!regex.emailFormat.test(email)) {
        return response.status(400).json({error: 'Enter a valid email format.'});
        }

        // if email format is ok, it will check if it already exists.
        const emailRegistered = await registrations.findOne({where: {email: email}})
        if(emailRegistered){  
        return response.status(400).json({error:'Email already registered.'})
        }
            
        //Password validationpass
        if(!regex.passLength.test(password)){
        return response.status(400).json({ error: 'Password is 8 to 12 characters.' })
        }

        if(!regex.passFormat.test(password)){
        return response.status(400).json({error: 'Enter at least one uppercase and lowercase letter, one number and one special character.'})
        }

        if(password !== passconfirm){
        return response.status(400).json({error: 'Passwords do not match.'})
        }
                
        //Number validation
        if(!regex.numberFormats.test(number)){  // US or brazil number format
        return response.status(404).json({ error: 'Enter a valid number format.'})
        }
            
        next()
        } 
        
        catch (error) {
        console.log(error);
        return response.status(500).json({Error: 'validation fields failed'});
        }
    }