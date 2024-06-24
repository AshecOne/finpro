import { z } from 'zod';

export const adminUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password minimum length is 8!' }),
});

export type AdminUserSchema = z.infer<typeof adminUserSchema>;
