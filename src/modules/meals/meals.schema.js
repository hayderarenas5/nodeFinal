import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorDate.js'

const mealSchema= z.object({
    name: z
        .string({
            invalid_type_error: "name must be a correct format",
            required_error: "name is required",
        })
        .min(3, {message: "Name is too short"})
        .max(50, {message:"Name is too long"}),
    price: z
        .number({
            invalid_type_error: "price must be a correct format",
            required_error: "price is required",
        }),
    role: z
        .enum(['normal','admin'])
})

export function validateMeal(data) {
    const result= mealSchema.safeParse(data)

    const {hasError, errorMessage, data: mealData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        mealData
    }
}

export function validateParcialMeals(data) {
    const result= mealSchema.partial().safeParse(data)

    const {hasError, errorMessage, data: mealsData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        mealsData
    }
}