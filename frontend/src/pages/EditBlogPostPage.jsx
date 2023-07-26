import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useBlog, useBlogById } from '../hooks/useBlog';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const EditBlogPostPage = () => {
  const { id } = useParams();
  const { updateBlog, isLoadingUpdate } = useBlog(); // Destructure isLoadingUpdate from useBlog hook
  const { blogPost, isLoading } = useBlogById(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setTitle(blogPost?.title || '');
      setContent(blogPost?.content || '');
      setKeywords(blogPost?.keywords.join(', ') || '');
    }
  }, [isLoading, blogPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const keywordsArray = keywords.split(',').map((keyword) => keyword.trim());

    await updateBlog({
      blogId: id,
      updatedData: { title, content, keywords: keywordsArray },
    });
  };

  return (
    <>
      <Link className="btn" to="/profile/posts">
        <FaArrowLeft /> Go Back
      </Link>

      <FormContainer>
        <h1 className="text-primary text-center">Edit Blog Post</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </Form.Group>

          <Form.Group className="my-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
            />
          </Form.Group>

          <Form.Group className="my-3" controlId="keywords">
            <Form.Label>Keywords</Form.Label>
            <Form.Control
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords"
            />
            <Form.Text className="text-muted">
              Please enter keywords separated by commas (e.g., react,
              javascript, web development)
            </Form.Text>
          </Form.Group>

          <Button
            type="submit"
            disabled={isLoadingUpdate}
            variant="primary"
            className="w-100"
          >
            {isLoadingUpdate ? 'Updating...' : 'Update'}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EditBlogPostPage;
