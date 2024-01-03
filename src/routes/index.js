import express from 'express'
import { router as userRouter } from './../modules/users/users.router.js'
import { router as mealRouter } from './../modules/meals/meals.router.js'
import { router as restaurantRouter } from './../modules/restaurants/restaurant.router.js'
import { router as orderRouter } from './../modules/orders/order.router.js'

export const router = express.Router()

router.use('/users', userRouter)
router.use('/meals', mealRouter)
router.use('/restaurants', restaurantRouter)
router.use('/orders', orderRouter)