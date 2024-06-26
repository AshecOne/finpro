import { z } from 'zod';

export const adminUserSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password minimum length is 8!' }),
});

export type AdminUserSchema = z.infer<typeof adminUserSchema>;