import User from '../types/User';

const API_URL = import.meta.env.VITE_API_URL;

const createUser = async (user: User) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('User creation failed');
  }

  return response.json();
};

const UserService = { createUser };

export default UserService;
