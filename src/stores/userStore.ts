import { loginUser, registerUser } from '@/api/user';
import type { TUser } from '@/types/userTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<TUser | null>(null);
  const loader = ref<boolean>(false);
  const error = ref<string | null>(null);

  const register = async (
    name: string,
    surname: string,
    email: string,
    password: string,
  ) => {
    loader.value = true;
    error.value = null;

    try {
      const data = await registerUser(name, surname, email, password);
      user.value = data;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || 'Ошибка регистрации';
        throw err;
      } else {
        error.value = 'Произошла непредвиденная ошибка';
        console.error(err);
      }
    } finally {
      loader.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    loader.value = true;
    error.value = null;

    try {
      const data = await loginUser(email, password);
      user.value = data;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || 'Ошибка входа';
        throw err;
      } else {
        error.value = 'Произошла непредвиденная ошибка';
        console.error(err);
      }
    } finally {
      loader.value = false;
    }
  };

  return {
    user,
    loader,
    error,
    register,
    login,
  };
});
