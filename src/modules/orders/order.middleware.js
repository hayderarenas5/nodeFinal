import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { OrderService } from "./order.service.js";

export const validateExitOrder= catchAsync( async(req, res, next)=>{
    const { id } = req.params;

    const order = await OrderService.findOne(id);

    if(!order){
        return next(new AppError('repair not found'), 404)
    }

    req.order=order
    next()  
})