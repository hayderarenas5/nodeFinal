import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorDate.js'

const restaurantSchema= z.object({
    name: z
        .string({
            invalid_type_error: "Date must be a correct format",
            required_error: "Date is required"
        }),
        address: z
        .string({required_error: "Date is required"})
        .min(3, {message: "Very small address number"}),
})


export function validateRestaurant(data) {
    const result= restaurantSchema.safeParse(data)

    const {hasError, errorMessage, data: restaurantData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        restaurantData
    }
}

export function validateParcialRestaurant(data) {
    const result= restaurantSchema.partial().safeParse(data)

    const {hasError, errorMessage, data: restaurantData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        restaurantData
    }
}