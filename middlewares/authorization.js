import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config';

const jwt = jsonwebtoken

export async function Authorization (request, response, next) {
    try {

        const secret = process.env.SECRET

        // check if token exists
        const authheader = request.headers['authorization']
        const token = authheader && authheader.split(' ')[1]

        if(!token){
        return response.redirect('/registrations')
        }

        jwt.verify(token, secret)

        next()

    } catch (error) {
        console.log(error)
        return response.status(400).json({msg: 'Access denied.'})
    }
}