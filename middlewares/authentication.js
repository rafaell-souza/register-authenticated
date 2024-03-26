import 'dotenv/config';
import registration from '../sequelize/models/registrations.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import regex from '../fields-format.js' // Fields configs come from here.
import {BadRequestError} from '../custon-errors/errors-api.js'


export async function Authentication (request, response, next) {

        const {email, password} = request.body;

        if(!email || !password){
        throw new BadRequestError('Email and password are required.')}
        

        //check email format
        if (!regex.emailFormat.test(email)) {
        throw new BadRequestError('Invalid email format.')
        }

        // check email
        const checkOneDb = await registration.findOne({where: {email: email}})
        if(!checkOneDb){
        throw new BadRequestError('Incorrect email or password.')
        }

        const checkPassword = await bcrypt.compare(password, checkOneDb.password)

        if(!checkPassword){
        throw new BadRequestError('Incorrect email or password.')
        }
        
        // jwt config
        const secret = process.env.SECRET
        const datas = checkOneDb.id.toString() && checkOneDb.name

        const token = jwt.sign({}, secret, {
        subject: datas,
        expiresIn: '10m'
        })

        return response.status(200).json({message: 'User logged in.', token})
}
