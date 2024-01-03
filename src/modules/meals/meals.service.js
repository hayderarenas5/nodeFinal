import { Meal } from "./meals.model.js";

export class MealService {
    static async findOneMeals(id){
        return await Meal.findOne({ 
          where: {
            id: id,
          }
        })
    }

    static async findAllMeals() {
        return Meal.findAll({
            where: {
                status: true
            }
        })
    }

    static async createMeal(data) {
        return Meal.create(data)
    }

    static async update(meal, data){
        return await meal.update(data)
    }

    static async delete(user){
        return await user.update({ status: false })
    }
}