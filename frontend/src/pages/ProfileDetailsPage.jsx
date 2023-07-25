import { useState } from 'react';
import { Form, Button, Col, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

import { useAuthContext } from '../hooks/useAuthContext';
import { useFormik } from 'formik';
import { useUser } from '../hooks/useUser';

const ProfileDetailsPage = () => {
  const { user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);

  const { updateProfile, isLoadingUpdate } = useUser();

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      handleSaveChanges(values);
    },
  });

  const handleCancel = () => {
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleSaveChanges = async (values) => {
    await updateProfile(values);
    setEditMode(false);
  };

  return (
    <FormContainer>
      <h2 className="text-center">Profile Information</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="username" className="my-3">
          <Form.Label>Username</Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="username"
              readOnly={!editMode}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Col>
            <Form.Control
              type="email"
              name="email"
              readOnly={!editMode}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="firstName" className="my-3">
          <Form.Label>First Name</Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="firstName"
              readOnly={!editMode}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="lastName" className="my-3">
          <Form.Label>Last Name</Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="lastName"
              readOnly={!editMode}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </Col>
        </Form.Group>

        {editMode && (
          <>
            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Label>Confirm Password</Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </Col>
            </Form.Group>
          </>
        )}

        {editMode && (
          <Button variant="primary" type="submit" disabled={isLoadingUpdate}>
            {isLoadingUpdate ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-1"
                />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        )}

        {!editMode && ( // Show the "Edit Profile" button only when not in edit mode
          <Button variant="primary" onClick={toggleEditMode}>
            Edit Profile
          </Button>
        )}

        {editMode && (
          <Button variant="danger" className="mx-2" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </Form>
    </FormContainer>
  );
};

export default ProfileDetailsPage;
