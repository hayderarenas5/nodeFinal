import { User } from "../users/users.model.js";
import { Restaurant } from "./restaurants.model.js";
import { Review } from "./review.model.js";

export class RestaurantService {
    static async findOne(id){
        return await User.findOne({ 
          where: {
            id: id,
          }
        })
    }

    static async findAllRestaurant() {
        return Restaurant.findAll({
            where: {
                status: true
            }
        })
    }

    static async createRestaurant(data) {
        return Restaurant.create(data)
    }

    static async findOneRestaurant(id){
        return await Restaurant.findOne({
            where :{
                id: id,
                status: true
            }
        }) 
    }

    static async createReview(data){
        return Review.create(data)
    }

    static async findOneReview(id){
        return await Review.findOne({
            where: {
                id: id,
                status: true
            },
            include: {
                model: User
            }
        })
    }

    static async updateRestaurant(restaurant, data){
        return await restaurant.update(data)
    }

    static async delete(restaurant){
        return await restaurant.update({ status: false })
      }
}