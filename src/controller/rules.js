import registrations from "../../sequelize/models/registrations.js"
import bcrypt from 'bcrypt'

export class Controllers {
async GetAll(request, response) {
    try {
        const Profiles = await registrations.findAll({attributes: 
        ['id','name', 'email', 'number']});

        return response.status(200).json(Profiles);
        }

    catch (error) {
        console.error(error);
        return response.status(500).json({error: 'Fail when locating profiles'});
        }
    }

async GetOne(request, response) {
    try {
        const { id } = request.params

        const ProfileBId = await registrations.findByPk(id, {attributes:
        ['id','name', 'email', 'number']});

        return response.status(200).json(ProfileBId);
        } 

    catch (error) {
        console.error(error);
        return response.status(500).json({error: 'Fail when trying to locate profile'});
        }
    }

async Create(request, response) {
    try {
        const {name, password, email, number} = request.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await registrations.create({
        name: name,
        number: number,
        password: hashedPassword,
        email: email
        })
    
        return response.status(201).json(newUser)
        } 

    catch (error) {
        console.log(error);
        return response.status(500).json({error: 'Fail when creating a new user'});
        }
    }

async Update(request, response) {
    try {
        const {id} = request.params;
        const {name, password, email, number} = request.body;
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const updateDatas = await registrations.update({
        name: name,
        password: hashedPassword,
        email: email,
        number: number}, {where:{id: id}}
        )
    
        return response.status(201).json(updateDatas);
        } 
    
    catch (error) {
        console.log(error);
        return res.status(500).json({error: 'update failed.'});
        }
    }

async Exclude(request, response) {
    try {
        const {id} = request.params

        const userToDelete = await registrations.destroy({where: {id: id}})
        return response.status(200).json(userToDelete)
        } 
            
    catch (error) {
        console.error(error);
        return response.status(500).json({error: 'Fail when trying to delete user'})
        }
    }
}