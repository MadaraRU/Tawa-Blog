import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from 'react-icons/ai';
import { useBlog } from '../hooks/useBlog';

const MyBlogCard = ({ blog }) => {
  const { _id, title, author, content, likes, dislikes, comments, createdAt } =
    blog;

  const { deleteBlog, isLoadingDelete } = useBlog();
  const preview =
    content?.length > 100 ? content.substring(0, 100) + '...' : content;

  return (
    <Card className="mb-4 justify-content-md-center">
      <Card.Body>
        <Card.Title className="blog-title">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(createdAt).toLocaleString()}
        </Card.Subtitle>
        <Card.Text>{preview}</Card.Text>
        <div className="justify-content-end">
          <Link to={`/blog/${_id}`}>
            <Button variant="outline-primary">Read More</Button>
          </Link>
          <Link to={`/blog/${_id}/edit-post`} className="mx-2">
            <Button variant="outline-info">Edit</Button>
          </Link>

          <Button
            variant="outline-danger"
            onClick={async () => await deleteBlog(_id)}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? 'Deleting...' : 'Delete'}
          </Button>
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

export default MyBlogCard;
