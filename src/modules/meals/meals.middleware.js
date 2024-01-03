import { catchAsync } from "../../common/errors/catchAsync.js";
import { MealService } from "./meals.service.js";

export const validateExitMeals= catchAsync( async(req, res, next)=>{
    const { id } = req.params;

    const meals = await MealService.findOneMeals(id);

    if(!meals){
        return next(new AppError('meals not found'), 404)
    }

    req.meals=meals
    next()  
})