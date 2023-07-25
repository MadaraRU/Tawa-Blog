import { Nav } from 'react-bootstrap';
import { useUser } from '../hooks/useUser';
import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const ProfilePage = () => {
  const { profileData, isLoading, error } = useUser();
  return (
    <>
      <Nav
        className="justify-content-md-center"
        variant="tabs"
        defaultActiveKey="/profile"
      >
        <Nav.Item>
          <LinkContainer to="/profile/details">
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
