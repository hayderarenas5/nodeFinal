import express from 'express'
import { createUser, deleteUser, findOneOrder, findUserOrders, login, updateProfile } from './user.controller.js'
import { protect, protectAccountOwner, validExistUser } from './user.middleware.js'

export const router= express.Router()

router.post('/signup', createUser)
router.post('/login', login)

router.use(protect)
router.patch('/:id', validExistUser, protectAccountOwner, updateProfile)
router.delete('/:id',validExistUser, protectAccountOwner, deleteUser)

router.get('/orders', findUserOrders)

router.get('/orders/:id', findOneOrder)