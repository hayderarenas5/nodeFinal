import express from 'express'
import { createOrders, deleteorder, findAllOrder, findOneOrder, updateOrder } from './order.constroller.js'
import { validateExitOrder } from './order.middleware.js'

export const router= express.Router()

router.post('/createOrder', createOrders)

router
    .route('/')
    .get(findAllOrder)

router
    .route('/:id')
    .get(validateExitOrder, findOneOrder)
    .patch(validateExitOrder, updateOrder)
    .delete(validateExitOrder, deleteorder)