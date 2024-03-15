const db = require('../../database/configs');
const registrations = require('../../sequelize/models/registrations')

module.exports = {

    async GetAll(req, res) {

    const results = {error: '', results:[]};

        try {
            results.results = await registrations.findAll();
            return res.status(200).json(results.results);
            
        } catch (error) {
            results.error = 'Internal error.'
            console.error('failed', error);
            res.status(500).json(results.error);
        }
    },


    async GetOne(req, res) {

    const results = {error: '', results:[]};
    const {id} = req.params

        try {
            const checkId = await registrations.findOne({ where: {id: id}})

            if(!checkId) {
            results.error = "Id not found."
            return res.status(404).json(results.error)
            }

            if(checkId) {
            results.results = await registrations.findByPk(id)
            return res.status(200).json(results.results)
            }


        } catch (error) {
            console.error(error);
            results.error = 'Server internal error'
            return res.status(500).json({error: results.error})
        }
    },


    async create(req, res) {

    const results = {error:'', results: []}
    const {name, password, email, number} = req.body;

        try {
            if(!name || !password || !email || !number) {
            results.error = 'Please, make sure to fill all the fields.'
            return res.status(400).json(results.error)
            }

            const checkEmail = await registrations.findAll(
            {where:{email: email}})

            if(checkEmail) {
            results.error = 'This email has already been registered'
            return res.status(400).json(results.error)
            }

            if(name && password && email && number) {
            results.results = await registrations.create({
            name: name,
            email: email,
            password: password,
            number: number
            })
            }

        } catch (error) {
            console.log(error)
            results.error = 'Server internal error'
            return res.status(500).json(results.error)
        }
    }
}