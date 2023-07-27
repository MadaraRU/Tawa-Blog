import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { useBlog } from '../hooks/useBlog';
import { useAuthContext } from '../hooks/useAuthContext';

jest.mock('../hooks/useBlog');
jest.mock('../hooks/useAuthContext');

describe('MainPage', () => {
  it('should render the loading message while fetching data', () => {
    useBlog.mockReturnValue({ blogPosts: [], isLoading: true });
    useAuthContext.mockReturnValue({ user: null });

    const { getByText } = render(
      <Router>
        <MainPage />
      </Router>
    );

    expect(getByText('Is loading')).toBeInTheDocument();
  });

  it('should render no blog posts available message when there are no posts', () => {
    useBlog.mockReturnValue({ blogPosts: [], isLoading: false });
    useAuthContext.mockReturnValue({ user: null });

    const { getByText } = render(
      <Router>
        <MainPage />
      </Router>
    );

    expect(getByText('No blog posts available.')).toBeInTheDocument();
  });

  it('should render the "Create New Post" button when there are no posts and user is authenticated', () => {
    useBlog.mockReturnValue({ blogPosts: [], isLoading: false });
    useAuthContext.mockReturnValue({ user: { id: 1, username: 'testuser' } });

    const { getByText } = render(
      <Router>
        <MainPage />
      </Router>
    );

    expect(getByText('Create New Post')).toBeInTheDocument();
  });
});
