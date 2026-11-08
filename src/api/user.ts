import { API_BASE_URL, ENDPOINTS } from '@/constants';
import { UserSchema, type TUser } from '@/types/userTypes';

async function validationResponse(response: Response) {
  if (response.ok) return response;

  let message = 'Произошла непредвиденная ошибка';

  try {
    const data = await response.json();
    message = data.message || message;
  } catch {
    if (response.status >= 500) {
      message = 'Ошибка сервера, попробуйте позже';
    } else {
      const text = await response.text();
      message = text || message;
    }
  }

  throw new Error(message);
}

export const registerUser = async (
  name: string,
  surname: string,
  email: string,
  password: string,
): Promise<TUser> => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.auth.register}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, surname, email, password }),
  });
  await validationResponse(response);
  const data = await response.json();
  return UserSchema.parse(data);
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<TUser> => {
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.auth.login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  await validationResponse(response);
  const data = await response.json();
  return UserSchema.parse(data);
};
