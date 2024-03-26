import 'dotenv/config';
import jwt from 'jsonwebtoken'

export async function Authorization (request, response, next) {

        const secret = process.env.SECRET

        // check if token exists
        const authheader = request.headers['authorization']
        const token = authheader && authheader.split(' ')[1]

        if(!token){
        return response.redirect('/')
        }

        jwt.verify(token, secret)
        next()
}