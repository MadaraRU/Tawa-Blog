import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BlogPage = () => {
  return (
    <>
      <Link className="btn " to="/">
        <FaArrowLeft /> Go Back
      </Link>
    </>
  );
};
export default BlogPage;
