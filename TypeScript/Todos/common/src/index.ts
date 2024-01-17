import { z } from 'zod';

export const signupInput = z.object({
     username : z.string().min(1).max(15),
     password : z.string().min(1).max(15),
});

export type signupParam = z.infer<typeof signupInput>;   // reusable code can be use in frontent
