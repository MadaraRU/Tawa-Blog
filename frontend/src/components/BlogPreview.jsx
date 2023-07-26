import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const BlogPreview = ({ blogPost }) => {
  const { _id, title, createdAt } = blogPost;

  return (
    <Link to={`/blog/${_id}`} className="custom-link">
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{new Date(createdAt).toLocaleString()}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default BlogPreview;
