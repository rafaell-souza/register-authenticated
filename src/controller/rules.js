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
    const {name, password, email, number, permission} = req.body;

        try {
            if(!name || !password || !email || !number) {
            results.error = 'Please, make sure to fill the required fields.'
            return res.status(400).json(results.error)
            }

            const checkEmail = await registrations.findOne(
            {where:{email: email}})

            if(checkEmail) {
            results.error = 'This email has already been registered'
            return res.status(400).json(results.error)
            }
            else {
            results.results = await registrations.create({
            name: name, email: email, 
            password: password, number: number,
            permission: permission || 'standard'})

            return res.status(201).json(results.results)
            }
            

        } catch (error) {
            console.log(error)
            results.error = 'Server internal error'
            return res.status(500).json(results.error)
        }
    },




    async update(req, res) {

    const results = {error:'', results:[]};
    const {id} = req.params;
    const {name, password, email, number, permission} = req.body

    try {

        if(!name || !password || !email || !number || !permission){
            results.error = 'All the required fields must to be filled.'
            return res.status(400).json(results.error)
        }
        else {
            results.results = await registrations.update({
                name: name,
                email: email,
                password: password,
                number: number,
                permission: permission},
            {where:{id: id}})

            return res.status(200).json(results.results)
        }

    } catch (error) {
         console.error(error)
         results.error = 'server internal error at put method.'
         return res.status(500).json(results.results)
    }},




    async exclude(req, res) {
    
    const {id} = req.params;
    
    try {
        
        const checkId = await registrations.findOne({where: {id: id}})
        if(!checkId){

            error = 'Id user not found.'
            return res.status(404).json(error)
        }
        else{
        let excludeId = await registrations.destroy({where: {id: id}})
        return res.status(200).json(
        {message: `${excludeId} user excluded.`})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json('Server internal error')
    }

    }
}