import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorDate.js'

const orderSchema= z.object({
    totalPrice: z
        .number({
            invalid_type_error: "Date must be a correct format",
            required_error: "Date is required"
        })
})


export function validateOrder(data) {
    const result= orderSchema.safeParse(data)

    const {hasError, errorMessage, data: orderData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        orderData
    }
}

export function validateParcialOrder(data) {
    const result= orderSchema.partial().safeParse(data)

    const {hasError, errorMessage, data: orderData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        orderData
    }
}