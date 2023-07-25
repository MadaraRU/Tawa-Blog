import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUser } from 'react-icons/fa';
import { FaSignInAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaNewspaper } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>TAWA BLOG</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <LinkContainer to="/add-post">
                    <Nav.Link>
                      <FaNewspaper /> Add Post
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={user.username} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <FaUser />
                        {'  '} Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logout}>
                      <FaSignOutAlt /> {'  '}Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
