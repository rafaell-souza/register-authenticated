import registrations from '../sequelize/models/registrations.js'
import regex from '../fields-format.js'
import {NotFoundError, BadRequestError} from '../custon-errors/errors-api.js'


export async function VerifyFields(request, response, next) {
    
        const {email, password, passconfirm, number, name} = request.body
            
        if (!name || !password || !passconfirm || !email || !number) {
        throw new NotFoundError('All fields are required.')
        }

        //name validation
        if(!regex.nameLength.test(name)){
        throw new BadRequestError('Name is 3 to 50 characters.')
        }

        if(!regex.nameFormat.test(name)){
        throw new BadRequestError('Enter only letters for name.')
        }

        //email validation
        if(!regex.emailLength.test(email)){
        throw new BadRequestError('Email is 5 to 50 characters.')
        }

        if (!regex.emailFormat.test(email)) {
        throw new BadRequestError('Enter a valid email format.')
        }

        // if email format is ok, it will check if it already registered.
        const emailRegistered = await registrations.findOne({where: {email: email}})
        if(emailRegistered){  
        throw new BadRequestError('Email already registered.')
        }
            
        //Password validationpass
        if(!regex.passLength.test(password)){
        throw new BadRequestError('Password is 8 to 20 characters.')
        }

        if(!regex.passFormat.test(password)){
        throw new BadRequestError('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.')
        }

        if(password !== passconfirm){
        throw new BadRequestError('Passwords do not match.')
        }
                
        //Number validation
        if(!regex.numberFormats.test(number)){  // US or brazil number format
        throw new BadRequestError('Enter a valid phone number.')
        }
            
        next()
}