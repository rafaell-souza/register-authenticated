import registration from '../sequelize/models/registrations.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config';
import regex from '../fields-format.js'

const jwt = jsonwebtoken

export async function Authentication(request, response, next) {

    try {
        const {email, password} = request.body;

        if(!email || !password){
        return response.status(400).json({msg: 'Enter your email and password.'})
        }

        //check email format
        if (!regex.emailFormat.test(email)) {
        return response.status(400).json({error: 'Enter a valid email format.'});
        }

        // check email
        const checkProfile = await registration.findOne({where: {email: email}})
        if(!checkProfile){
        return response.status(400).json({error: 'Incorrect email or password.'})
        }

        // check password
        const checkProfilePass = await bcrypt.compare(password, checkProfile.password)
        if(!checkProfilePass){
        return response.status(400).json({error: 'Incorrect email or password.'})
        }
        
        // jwt config
        const secret = process.env.SECRET
        const Profileid = checkProfile.id.toString()

        const token = jwt.sign({}, secret, {
        subject: Profileid,
        expiresIn: '10m'
        })

        return response.status(200).json({message: 'User logged in.', token})
       

    } 

    catch (error) {
        console.error(error);
        return response.status(500).json({msg: 'Error when authenticating. Try again.'})
    }
}
