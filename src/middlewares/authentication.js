const registration = require('../../sequelize/models/registrations')
const bcrypt = require('bcrypt')


module.exports = {

    async Authentication(req, res, next) {

    try {
        const {email, password} = req.body;

        if(!email || !password){
        return res.status(400).json({msg: 'Please, insert email and password.'})
        }

        const user = await registration.findOne({where: {email: email}})
        if(!user){
        return res.status(400).json({error: 'This email is not registered.'})
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
        return res.status(400).json({error: 'Wrong password.'})
        }

        next()
        } 

    catch (error) {
        console.error(error);
        return res.status(500).json({msg: 'Error when authenticating. Try again.'})
    }
    }
}