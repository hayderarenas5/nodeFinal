import express from 'express'
import { createRestaurant, createReview, deleteRestaurant, findAllRestaurants, findOneRestaurant, updateRestaurant } from './restaurant.controller.js'
import { protect, protectAccountOwner } from '../users/user.middleware.js'
import { validExistRestaurant, validExistReview } from './restaurant.middleware.js'

export const router= express.Router()

router.use(protect)

router
  .route('/')
  .get(findAllRestaurants)

router.route('/')
    .post(createRestaurant)

router
    .route('/:id')
    .get(validExistRestaurant, findOneRestaurant)
    .patch(validExistRestaurant, updateRestaurant)
    .delete(validExistRestaurant, deleteRestaurant)

router.post('/reviews/:id', validExistRestaurant, createReview)
router.route('/reviews/:restaurantId/:id')
    .patch(validExistRestaurant, protectAccountOwner, updateRestaurant)
    .delete(validExistRestaurant, validExistReview, protectAccountOwner/* ,deleteReview */)