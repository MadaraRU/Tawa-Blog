import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthContext } from './useAuthContext';
import { queryClient } from '../react-query/queryClient';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api/blog';

export const useBlog = () => {
  const { user } = useAuthContext();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  };

  const { data, isLoading, error, isFetching } = useQuery(
    ['blogs'],
    async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    }
  );

  const { data: myBlogPost } = useQuery(['myBlogs'], async () => {
    const response = await fetch(API_URL + '/my-blogs', { headers });
    const data = await response.json();
    return data;
  });

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
      console.log(blogId);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['blogs']);
        queryClient.invalidateQueries(['myBlogs']);
        toast.success('Blog post successfully updated!', {
          position: 'bottom-center',
        });
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
        queryClient.invalidateQueries(['myBlogs']);
        toast.success('Blog post successfully deleted!', {
          position: 'bottom-center',
        });
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
    isLoadingUpdate: updateBlogMutation.isLoading,
    isLoadingDelete: deleteBlogMutation.isLoading,
    myBlogPost,
  };
};

export const useBlogById = (blogId) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const { data, isLoading, error, isFetching } = useQuery(
    ['blogs', blogId],
    async () => {
      const response = await fetch(API_URL + '/' + blogId, { headers });
      const data = await response.json();
      return data;
    }
  );

  return {
    blogPost: data,
    isLoading,
    error,
  };
};

export const useComment = (blogId) => {
  const { user } = useAuthContext();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  };

  const addCommentMutation = useMutation(
    async (comment) => {
      const response = await fetch(`${API_URL}/${blogId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
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
        toast.success('Comment successfully added!', {
          position: 'bottom-right',
        });
      },
    }
  );

  return {
    addComment: addCommentMutation.mutateAsync,
    isLoadingComment: addCommentMutation.isLoading,
  };
};

export const useLike = (blogId) => {
  const { user } = useAuthContext();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  };

  const addLikeMutation = useMutation(
    async () => {
      const response = await fetch(`${API_URL}/${blogId}/like`, {
        method: 'POST',
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
      },
    }
  );

  return {
    addLike: addLikeMutation.mutateAsync,
    isLoadingLike: addLikeMutation.isLoading,
  };
};
export const useDislike = (blogId) => {
  const { user } = useAuthContext();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  };

  const addDislikeMutation = useMutation(
    async () => {
      const response = await fetch(`${API_URL}/${blogId}/dislike`, {
        method: 'POST',
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
      },
    }
  );

  return {
    addDislike: addDislikeMutation.mutateAsync,
    isLoadingDislike: addDislikeMutation.isLoading,
  };
};
