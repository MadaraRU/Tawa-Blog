import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { FaArrowLeft } from 'react-icons/fa';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from 'react-icons/ai';

import {
  useBlog,
  useBlogById,
  useComment,
  useDislike,
  useLike,
} from '../hooks/useBlog';
import {
  Badge,
  Button,
  Col,
  Form,
  ListGroup,
  Row,
  Stack,
} from 'react-bootstrap';
import BlogPreview from '../components/BlogPreview';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

const BlogPage = () => {
  const { id } = useParams();
  const { blogPosts, isLoading: blogPostsLoading } = useBlog();
  const { user } = useAuthContext();
  const { addComment, isLoadingComment } = useComment(id);
  const { addLike } = useLike(id);
  const { addDislike } = useDislike(id);

  const [comment, setComment] = useState();

  const { blogPost, isLoading } = useBlogById(id);
  if (isLoading) return <p>isLoading...</p>;
  if (blogPostsLoading) return <p>Other blog posts loading...</p>;

  const blogDate = new Date(blogPost.createdAt).toLocaleString();
  const otherBlogPosts = blogPosts?.filter(
    (posts) => posts._id !== blogPost._id
  );

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    await addComment({ content: comment });
    setComment('');
  };

  return (
    <>
      <Link className="btn " to="/">
        <FaArrowLeft /> Go Back
      </Link>

      <Row className="mt-5">
        <Col md={8}>
          <h2>{blogPost.title}</h2>
          <p className="text-muted">
            Written By {blogPost.author} <strong>.</strong> {blogDate}
          </p>
          <p>{blogPost.content}</p>
          <div className="my-2">
            <strong>Keywords: </strong>
            <span className="text-primary mx-2">
              {blogPost.keywords.join(', ')}
            </span>
          </div>
          <div className="d-flex align-items-center mt-3">
            <div>
              {user ? (
                <AiOutlineLike
                  className="me-1 custom-icons"
                  fill="green"
                  size={25}
                  onClick={async () => {
                    await addLike();
                  }}
                />
              ) : (
                <AiOutlineLike className="me-1 " fill="green" size={25} />
              )}
              <span className="me-3 text-success">{blogPost.likes.length}</span>
            </div>
            <div>
              {user ? (
                <AiOutlineDislike
                  className="me-1 custom-icons"
                  fill="red"
                  size={25}
                  onClick={async () => {
                    await addDislike();
                  }}
                />
              ) : (
                <AiOutlineDislike className="me-1 " fill="red" size={25} />
              )}
              <span className="me-3 text-danger">
                {blogPost.dislikes.length}
              </span>
            </div>
            <div>
              <AiOutlineComment className="me-1" size={25} />
              <span>{blogPost.comments.length}</span>
            </div>
          </div>
        </Col>
        <Col className="border-primary-left">
          <h3 className="mb-3">Other Blog Posts</h3>
          {otherBlogPosts.length === 0 && (
            <p>
              Sorry, there are no other blog posts available right now. Please
              check back later for more updates.
            </p>
          )}
          {otherBlogPosts.slice(0, 3).map((post) => (
            <BlogPreview key={post._id} blogPost={post} />
          ))}
        </Col>
      </Row>

      {/*Comment Seciton*/}

      <Row className="comments">
        <Col md={8}>
          <h2>Comments</h2>
          {blogPost.comments.length === 0 && (
            <p className="text-center">No Comments</p>
          )}
          <div>
            {blogPost.comments.map((comment) => (
              <div key={comment._id} className="border-bottom my-3">
                <strong>{comment.commenter}</strong>
                <p className="text-muted">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p>{comment.content}</p>
              </div>
            ))}
            <h2>Write a Comment</h2>
            <div>
              {user ? (
                <Form className="my-3" onSubmit={submitCommentHandler}>
                  <Form.Group className="my-2" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoadingComment}
                  >
                    {isLoadingComment ? 'Submitting...' : 'Submit'}
                  </Button>
                </Form>
              ) : (
                <p>
                  Please <Link to="/login">sign in</Link> to write a comment
                </p>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default BlogPage;
