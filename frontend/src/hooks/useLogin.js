import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from './useAuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const loginMutation = useMutation(async ({ username, password }) => {
    const response = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message, { position: 'bottom-center' });

      throw new Error(data.message);
    }

    // save the user to local storage
    localStorage.setItem('user', JSON.stringify(data));

    // update the auth context
    dispatch({ type: 'LOGIN', payload: data });

    return data;
  });

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isLoading,
    error: loginMutation.error,
  };
};
