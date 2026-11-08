import z from 'zod';

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
});

export type TUser = z.infer<typeof UserSchema>;
