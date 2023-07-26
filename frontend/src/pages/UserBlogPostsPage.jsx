import { Col, Container, Row } from 'react-bootstrap';
import { useBlog } from '../hooks/useBlog';

import MyBlogCard from '../components/MyBlogCard';

const UserBlogPostsPage = () => {
  const { myBlogPost } = useBlog();
  return (
    <Container className="justify-content-md-center py-5">
      <h2 className="text-center">My Blog Posts</h2>

      {myBlogPost?.length === 0 && (
        <Row className="mt-5">
          <Col className="text-center">
            <p>No blog posts available.</p>
          </Col>
        </Row>
      )}

      <Row className="justify-content-md-center mt-5">
        {myBlogPost?.map((post) => (
          <Col sm={12} md={5} key={post._id}>
            <MyBlogCard blog={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default UserBlogPostsPage;
