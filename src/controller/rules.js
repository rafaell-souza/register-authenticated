import registrations from "../../sequelize/models/registrations.js"
import bcrypt from 'bcrypt'
import { NotFoundError } from '../../custon-errors/errors-api.js'

export class Controllers {
    async GetAll(request, response) {
        const Profiles = await registrations.findAll({attributes: 
        ['id','name', 'email', 'number']});

        return response.status(200).json(Profiles);
};

async GetOne(request, response) {
        const { id } = request.params

        const ProfileBId = await registrations.findByPk(id, {attributes:
        ['id','name', 'email', 'number']});

        if(!ProfileBId) {
        throw new NotFoundError('Profile not found')}

        return response.status(200).json(ProfileBId);
};

async Create(request, response) {
    
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

async Update(request, response) {

        const {id} = request.params;
        const {name, password, email, number} = request.body;

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const updateDatas = await registrations.update({
        name: name,
        password: hashedPassword,
        email: email,
        number: number}, {where:{id: id}}
        )
    
        return response.status(201).json(updateDatas);
}

async Exclude(request, response) {
    
        const {id} = request.params

        const userToDelete = await registrations.destroy({where: {id: id}})

        if(!userToDelete){
        throw new NotFoundError('Profile not found')
        }

        return response.status(200).json(userToDelete)
        }
}