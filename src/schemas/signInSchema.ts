import {z} from 'zod'

export const signInSchema = z.object({
    identifier: z.string(), //or email
    password: z.string()
})