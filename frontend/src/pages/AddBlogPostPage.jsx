import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import FormContainer from '../components/FormContainer';
import { AddBlogvalidationSchema } from '../validations/BlogValidation';
import { useBlog } from '../hooks/useBlog';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AddBlogPostPage = () => {
  const { addBlog } = useBlog();
  const initialValues = {
    title: '',
    content: '',
    keywords: [],
  };

  const onSubmit = async (values) => {
    const { title, content, keywords } = values;
    const keywordsArray = values.keywords
      .split(',')
      .map((keyword) => keyword.trim());

    await addBlog({ title, content, keywords: keywordsArray });

    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: AddBlogvalidationSchema,
    onSubmit,
  });

  return (
    <>
      <Link className="btn" to="/">
        <FaArrowLeft /> Go Back
      </Link>

      <FormContainer>
        <h1 className="text-primary text-center">Add Blog Post</h1>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="my-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.title && formik.errors.title}
              placeholder="Enter title"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.content && formik.errors.content}
              placeholder="Enter content"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.content}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-3" controlId="keywords">
            <Form.Label>Keywords</Form.Label>
            <Form.Control
              type="text"
              name="keywords"
              value={formik.values.keywords}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.keywords && formik.errors.keywords}
              placeholder="Enter keywords"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.keywords}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Please enter keywords separated by commas (e.g., react,
              javascript, web development)
            </Form.Text>
          </Form.Group>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="primary"
            className="w-100"
          >
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddBlogPostPage;
