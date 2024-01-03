import { User } from "./users.model.js";

export class UserService {
    static async create(data) {
        return await User.create(data)
    }

    static async findOneByEmail(email){
        return await User.findOne({
            where: {
                email: email,
                status: true
            }
        })
    }
    static async findOne(id){
        return await User.findOne({
            where: {
                id: id, 
                status: true
            }
        })
    }

    static async update(user, data){
        return await user.update(data)
    }

    static async delete(user){
        return await user.update({ status: false })
    }
}