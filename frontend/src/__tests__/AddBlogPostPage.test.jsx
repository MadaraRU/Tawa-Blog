import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlogPostPage from '../pages/AddBlogPostPage';
import { useBlog } from '../hooks/useBlog';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../hooks/useBlog');

describe('AddBlogPostPage', () => {
  it('should render the form and submit successfully', async () => {
    const addBlogMock = jest.fn().mockResolvedValue({
      _id: 'blog1',
      title: 'Test Blog Post',
      content: 'This is a test blog post.',
      keywords: ['test', 'blog', 'post'],
    });
    useBlog.mockReturnValue({ addBlog: addBlogMock });

    const { getByLabelText, getByText, getByPlaceholderText } = render(
      <Router>
        <AddBlogPostPage />
      </Router>
    );

    fireEvent.change(getByLabelText('Title'), {
      target: { value: 'Test Blog Post' },
    });
    fireEvent.change(getByLabelText('Content'), {
      target: { value: 'This is a test blog post.' },
    });
    fireEvent.change(getByLabelText('Keywords'), {
      target: { value: 'test, blog, post' },
    });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => expect(addBlogMock).toHaveBeenCalledTimes(1));

    expect(addBlogMock).toHaveBeenCalledWith({
      title: 'Test Blog Post',
      content: 'This is a test blog post.',
      keywords: ['test', 'blog', 'post'],
    });

    expect(getByPlaceholderText('Enter title')).toHaveValue('');
    expect(getByPlaceholderText('Enter content')).toHaveValue('');
    expect(getByPlaceholderText('Enter keywords')).toHaveValue('');
  });
});
