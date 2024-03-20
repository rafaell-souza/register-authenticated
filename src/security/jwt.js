const registration = require('../../sequelize/models/registrations')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = {

    async Auth(req, res) {
    try {
        
        await registration.findOne({email: req.body.email}, (error, user) => {

        if(!user){
        return res.status(401).json({message: 'User not found'})
        }})

        const validationPassword = await bcrypt.compareSync(req.body.password, user.password)
        if(!validationPassword){
        return res.status(401).json({message: 'Not allowed.'})
        }

        const token = jwt.sign({name: user.name, number: user.number})
        return res.statsu(200).json({
            message: 'Successfully logged.',
            data:{token}})

        } 

    catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }
    }
}