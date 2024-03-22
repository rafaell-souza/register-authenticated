const jwt = require('jsonwebtoken')

module.exports = {

async authorization(req, res, next) {

    try {

        const secret = 'fhmq58mtypnpn45rmcn48n594802vgtryyyrnu66'

        // check if token exists
        const authheader = req.headers['authorization']
        const token = authheader && authheader.split(' ')[1]

        if(!token){
        return res.status(401).json({msg: 'Sign up to acess this resource.'})
        }

        jwt.verify(token, secret)

        next()

    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'Access denied.'})
    }
}
}