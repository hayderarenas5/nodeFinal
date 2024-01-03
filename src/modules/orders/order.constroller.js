import { catchAsync } from "../../common/errors/catchAsync.js";
import { validateOrder, validateParcialOrder } from "./order.schema.js";
import { OrderService } from "./order.service.js";


export const findOneOrder =catchAsync( async(req, res, next) => {
    const{order}= req
    return res.status(200).json(order)
})


export const findAllOrder= catchAsync(async(req, res, next)=>{
    const order = await OrderService.findAllOrder();

    return res.status(200).json(order)
})

export const createOrders=catchAsync(async(req, res, next)=>{
    const {mealId, userId, totalPrice, quantity}= req.body

    const order= await OrderService.createOrder({mealId, userId, totalPrice, quantity})

    return res.status(201).json(order)
})

export const updateOrder =catchAsync( async(req, res, next) => {
    const { order } = req;
    const {hasError, errorMessage, orderData}= validateParcialOrder(req.body)

    if (hasError) {
      return res.status(422).json({
        status:'error',
        message: errorMessage
      })
    }

    const orderUpdated = await OrderService.update(order, orderData)

    return res.status(200).json(orderUpdated)
})

export const deleteorder=catchAsync(async(req, res, next)=>{
    const { order } = req;

      await OrderService.delete(order)
      return res.status(204).json(null)
})