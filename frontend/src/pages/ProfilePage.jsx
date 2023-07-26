import { Nav } from 'react-bootstrap';
import { useUser } from '../hooks/useUser';
import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const ProfilePage = () => {
  return (
    <>
      <Nav className="justify-content-md-center" variant="tabs">
        <Nav.Item>
          <LinkContainer to="/profile">
            <Nav.Link>My Details</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to="/profile/posts">
            <Nav.Link>My blog posts</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
      <Outlet />
    </>
  );
};
export default ProfilePage;
