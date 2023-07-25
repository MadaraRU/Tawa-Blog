import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthContext } from './useAuthContext';
import { queryClient } from '../react-query/queryClient';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api/user/profile';

export const useUser = () => {
  const { user: authUser, dispatch: authDispatch } = useAuthContext();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authUser.token}`,
  };

  const updateUserProfile = async (updatedData) => {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  const { data, isLoading, error } = useQuery(['profile'], () =>
    fetch(API_URL, { headers }).then((res) => res.json())
  );

  const mutation = useMutation(updateUserProfile, {
    onSuccess: (updatedUserData) => {
      queryClient.invalidateQueries(['Profile']);

      // Update user in AuthContext
      authDispatch({ type: 'LOGIN', payload: updatedUserData });

      // Update user in localStorage, including the new token
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      toast.success('Profile successfully updated!', {
        position: 'bottom-center',
      });
    },
  });

  return {
    profileData: data,
    isLoading,
    error,
    updateProfile: mutation.mutateAsync,
    isLoadingUpdate: mutation.isLoading,
    errorUpdate: mutation.error,
  };
};
