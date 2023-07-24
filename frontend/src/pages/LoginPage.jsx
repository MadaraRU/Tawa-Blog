import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useLogin } from '../hooks/useLogin';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';
import { loginValidationSchema } from '../validations/authValidation';

const LoginPage = () => {
  const { login, isLoading, error, errorMessages } = useLogin();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  const initialValues = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <FormContainer>
      <h1 className="text-primary text-center">Sign In</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="my-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.username && formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          disabled={isLoading || formik.isSubmitting}
          variant="primary"
          className="w-100"
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Don't have an account yet?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
