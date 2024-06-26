import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email is invalid!' }),
  password: z.string().min(8, { message: 'Password minimum length is 8!' }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
