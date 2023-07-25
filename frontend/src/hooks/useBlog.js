import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthContext } from './useAuthContext';
import { queryClient } from '../react-query/queryClient';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api/blog';

export const useBlog = () => {
  const { user } = useAuthContext();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
  };

  const { data, isLoading, error, isFetching } = useQuery(
    ['blogs'],
    async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    }
  );

  const addBlogMutation = useMutation(
    async (blog) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(blog),
        headers,
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message, { position: 'bottom-center' });

        throw new Error(data.message);
      }
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['blogs']);
        toast.success('Blog post successfully added!', {
          position: 'bottom-center',
        });
      },
    }
  );

  const updateBlogMutation = useMutation(
    async ({ blogId, updatedData }) => {
      const response = await fetch(`${API_URL}/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers,
      });
      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['blogs']);
      },
    }
  );

  const deleteBlogMutation = useMutation(
    async (blogId) => {
      const response = await fetch(`${API_URL}/${blogId}`, {
        method: 'DELETE',
        headers,
      });

      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['blogs']);
      },
    }
  );

  return {
    blogPosts: data,
    isLoading,
    error,
    isFetching,
    addBlog: addBlogMutation.mutateAsync,
    updateBlog: updateBlogMutation.mutateAsync,
    deleteBlog: deleteBlogMutation.mutateAsync,
  };
};
