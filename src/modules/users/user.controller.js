import { catchAsync } from "../../common/errors/catchAsync.js"
import { verifyPassword } from "../../config/plugins/encripted-password.plugin.js"
import { generateJWT } from "../../config/plugins/generate-jwt.plugin.js"
import { validateLogin, validatePartialUser, validateUser } from "./user.schema.js"
import { UserService } from "./user.service.js"

export const createUser =catchAsync(async(req, res, next)=>{
    const {hasError, errorMessage, userData} =validateUser(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessage
      })
    }

    const user = await UserService.create(userData)

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: user.id,
        name: user.name,
        email: user.email
    })
})
export const login= catchAsync(async(req, res, next)=>{
    const {hasError, errorMessage, userData}=validateLogin(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessage
      })
    }

    const user= await UserService.findOneByEmail(userData.email)

    if (!user) {
        return next(new AppError('This accont does not exist', 404))
    }

    const inCorrectPassword =await verifyPassword(userData.password, user.password)

    if (!inCorrectPassword) {
      return next(new AppError('Incorrect email or password'))
    }

    const token= await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: user.id,
        name: user.name,
        email: user.email
    })
})

export const updateProfile = catchAsync( async(req, res, next) => {
  const { user } = req;
  const {hasError, errorMessage, userData}= validatePartialUser(req.body)

  if (hasError) {
    return res.status(422).json({
      status:'error',
      message: errorMessage
    })
  }

  const userUpdated = await UserService.update(user, userData)

  return res.status(200).json(userUpdated)
})
export const deleteUser=catchAsync(async(req, res, next)=>{
  const { user } = req;

    await UserService.delete(user)
    return res.status(204).json(null)
})
export const findUserOrders =catchAsync(async(req, res, next)=>{

})
export const findOneOrder =catchAsync(async(req, res, next)=>{

})