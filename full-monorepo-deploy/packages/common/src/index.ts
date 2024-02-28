import {z} from "zod"

export const userInput = z.object({
     email : z.string(),
     password: z.string()
})

export type UserInputType = z.infer<typeof userInput>