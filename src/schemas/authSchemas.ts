import z from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Электронная почта обязательна')
    .pipe(z.email('Введите корректный email')),
  password: z
    .string()
    .nonempty('Пароль обязателен')
    .min(6, 'Пароль должен быть не менее 6 символов'),
});

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .nonempty('Имя обязательно')
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(50, 'Имя не должно превышать 50 символов')
      .regex(
        /^[а-яА-ЯёЁa-zA-Z\s-]+$/,
        'Имя может содержать только буквы, пробел и дефис',
      ),
    surname: z
      .string()
      .nonempty('Фамилия обязательна')
      .min(2, 'Фамилия должна содержать минимум 2 символа')
      .max(50, 'Фамилия не должна превышать 50 символов')
      .regex(
        /^[а-яА-ЯёЁa-zA-Z\s-]+$/,
        'Фамилия может содержать только буквы, пробел и дефис',
      ),
    email: z
      .string()
      .nonempty('Email обязателен')
      .pipe(
        z.email('Email должен содержать корректный формат электронной почты'),
      ),
    password: z
      .string()
      .nonempty('Пароль обязателен')
      .min(8, 'Длинна пароля должна быть не менее 8 символов'),
    confirmPassword: z.string().nonempty('Подтверждение пароля обязательно'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
