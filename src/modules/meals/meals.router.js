import express from 'express'
import { createMeals, deleteMeal, findAllMeals, findOneMeals, updateMeal } from './meals.controllers.js'
import { validateExitMeals } from './meals.middleware.js'

export const router= express.Router()

router.post('/:id', createMeals)

router
  .route('/')
  .get(findAllMeals)

router
    .route('/:id')
    .get(validateExitMeals, findOneMeals)
    .patch(validateExitMeals, updateMeal)
    .delete(validateExitMeals, deleteMeal)