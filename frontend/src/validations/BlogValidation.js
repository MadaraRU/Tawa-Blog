import * as Yup from 'yup';

export const AddBlogvalidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  keywords: Yup.string()
    .test(
      'comma-separated',
      'Please enter keywords separated by commas',
      (value) => {
        if (!value) return false; // Return false if the value is empty
        const keywords = value.split(',').map((keyword) => keyword.trim());
        return keywords.length > 1; // Check if there are at least two keywords
      }
    )
    .required('Keywords are required'),
});
