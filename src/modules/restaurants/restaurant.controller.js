import { catchAsync } from "../../common/errors/catchAsync.js"
import { validateParcialRestaurant } from "./restaurant.schema.js"
import { RestaurantService } from "./restaurant.service.js"

export const findAllRestaurants= catchAsync(async(req, res, next)=>{
    const restaurant = await RestaurantService.findAllRestaurant();

    return res.status(200).json(restaurant)
})

export const findOneRestaurant =catchAsync( async(req, res, next) => {
    const{restaurant}= req
    return res.status(200).json(restaurant)
})

export const createRestaurant= catchAsync(async(req, res, next)=>{
    const {name, address, rating}= req.body

    const restaurant= await RestaurantService.createRestaurant({name, address, rating})

    return res.status(201).json(restaurant)
})

export const createReview= catchAsync(async(req, res, next)=>{
    const { id }= req.params
    const {comment, rating }=req.body

    const {sessionUser}=req

    const review=await RestaurantService.createReview({
        userId: sessionUser.id,
        comment,
        restaurantId: id,
        rating: rating 
    })
    return res.status(201).json(review)
})

export const updateRestaurant=catchAsync(async(req, res, next)=>{
    const { restaurant } = req;
    const {hasError, errorMessage, restaurantData}= validateParcialRestaurant(req.body)

    if (hasError) {
      return res.status(422).json({
        status:'error',
        message: errorMessage
      })
    }

    const restaurantUpdated = await RestaurantService.updateRestaurant(restaurant, restaurantData)

    return res.status(200).json(restaurantUpdated)
    

})

export const deleteRestaurant= catchAsync(async(req, res, next)=>{
    const { id } = req.params;

    const restaurant = await RestaurantService.findOneRestaurant(id);

    if(!restaurant){
        return res.status(404).json({
          status: 'error',
          message: 'restaurant not found'
        })
    }

    await RestaurantService.delete(restaurant)

    return res.status(204).json(null)
})
