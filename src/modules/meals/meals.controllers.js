import { catchAsync } from "../../common/errors/catchAsync.js"
import { validateMeal, validateParcialMeals } from "./meals.schema.js"
import { MealService } from "./meals.service.js"

export const findOneMeals =catchAsync( async(req, res, next) => {
    const{meals}= req
    return res.status(200).json(meals)
})

export const findAllMeals= catchAsync(async(req, res, next)=>{
    const meals = await MealService.findAllMeals();

    return res.status(200).json(meals)
})

export const createMeals= catchAsync(async(req, res, next)=>{
    const { id }= req.params
    const {name, price, role }=req.body

    const review=await MealService.createMeal({
        name,
        restaurantId: id,
        price,
        role
    })
    return res.status(201).json(review)
})

export const updateMeal =catchAsync( async(req, res, next) => {
    const { meals } = req;
    const {hasError, errorMessage, mealsData}= validateParcialMeals(req.body)

    if (hasError) {
      return res.status(422).json({
        status:'error',
        message: errorMessage
      })
    }

    const mealUpdated = await MealService.update(meals, mealsData)

    return res.status(200).json(mealUpdated)
})

export const deleteMeal=catchAsync(async(req, res, next)=>{
    const { meals } = req;

      await MealService.delete(meals)
      return res.status(204).json(null)
})