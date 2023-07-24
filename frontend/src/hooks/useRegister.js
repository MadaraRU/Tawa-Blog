import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useRegister = () => {
  const registerMutation = useMutation(
    async ({ username, firstName, lastName, email, password }) => {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: 'bottom-center' });
        throw new Error(data.message);
      }

      toast.success('Account successfully created');

      return data;
    }
  );

  return {
    register: registerMutation.mutateAsync,
    isLoading: registerMutation.isLoading,
    error: registerMutation.error,
  };
};
