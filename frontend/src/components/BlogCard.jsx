import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from 'react-icons/ai';

const BlogCard = ({ blog }) => {
  const { _id, title, author, content, likes, dislikes, comments, createdAt } =
    blog;

  const preview =
    content?.length > 100 ? content.substring(0, 100) + '...' : content;

  return (
    <Card className="mb-4 justify-content-md-center">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(createdAt).toLocaleDateString()}
        </Card.Subtitle>
        <Card.Text>{preview}</Card.Text>
        <div className="justify-content-end">
          <Link to={`/blog/${_id}`}>
            <Button variant="outline-primary">Read More</Button>
          </Link>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <AiOutlineLike className="me-2" /> {likes?.length}
            <AiOutlineDislike className="ms-3 me-2" /> {dislikes?.length}
            <AiOutlineComment className="ms-3 me-2" /> {comments?.length}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
