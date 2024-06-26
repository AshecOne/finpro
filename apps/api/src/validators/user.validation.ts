import { z } from 'zod';

export class UserValidation {
  static CREDENTIAL = z.object({
    username: z
      .string({ message: 'Username must be string!' })
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(50, { message: 'Username must not exceed 50 characters' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores',
      })
      .optional(),
    password: z
      .string({ message: 'Password must be string!' })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must not exceed 100 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      })
      .optional(),
  });
  static EMAIL = z
    .string({ message: 'Email must be string!' })
    .email({ message: 'Invalid email address' })
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(255, { message: 'Email must not exceed 255 characters' });
  static CREATE = z.object({
    username: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(5, { message: 'Email must be at least 5 characters long' })
      .max(255, { message: 'Email must not exceed 255 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must not exceed 100 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
  });

  static UPDATE = z.object({
    username: z.string().min(1, { message: 'Name is required' }).optional(),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(5, { message: 'Email must be at least 5 characters long' })
      .max(255, { message: 'Email must not exceed 255 characters' })
      .optional(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must not exceed 100 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      })
      .optional(),
  });
  static QUERY = z.object({
    filter: z.string().optional(),
    limit: z.coerce.number().int().optional(),
    page: z.coerce.number().int().optional(),
    sortBy: z.string().optional(),
    orderBy: z.enum(['asc', 'desc']).optional(),
  });
}
