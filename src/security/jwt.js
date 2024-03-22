const jwt = require('jsonwebtoken')

module.exports = {

    async Login(req, res){

    try {
        const secret = 'fhmq58mtypnpn45rmcn48n594802vgtryyyrnu66'
        const token = jwt.sign({}, secret)

        return res.status(200).json({msg: 'User logged in', token})
        }
        
    catch (error) {
        console.error(error);
        return res.status(500).json({msg: 'Login failed.'})
        }
    },
}