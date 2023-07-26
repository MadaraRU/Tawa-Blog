import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import { useAuthContext } from '../hooks/useAuthContext';
import BlogCard from '../components/BlogCard';

const MainPage = () => {
  const { blogPosts, isLoading } = useBlog();
  const { user } = useAuthContext();

  if (isLoading) return <p>Is loading</p>;

  return (
    <Container className="justify-content-md-center py-5">
      <h1 className="text-center text-primary">Welcome To Our Blog</h1>

      {blogPosts?.length === 0 && (
        <Row className="mt-5">
          <Col className="text-center">
            <p>No blog posts available.</p>
            {user && (
              <Link to="/add-post" className="btn btn-primary">
                Create New Post
              </Link>
            )}
          </Col>
        </Row>
      )}

      <Row className="justify-content-md-center mt-5">
        <Col sm={12} md={7}>
          {blogPosts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <BlogCard key={post._id} blog={post} />
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
