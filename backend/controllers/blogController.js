import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

//Get connected user blog
const getUserBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.find({ authorId: req.user.id });

  res.status(200).json(blog);
});

// Get all users blog
const getAllBlogs = asyncHandler(async (req, res) => {
  const blog = await Blog.find();

  res.status(200).json(blog);
});

// Get blog by id
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  res.status(200).json(blog);
});

//Add blog
const addBlog = asyncHandler(async (req, res) => {
  const { content, title, keywords } = req.body;

  if (!content) {
    res.status(400);
    throw new Error('Content is required');
  }

  if (!title) {
    res.status(400);
    throw new Error('Title is required');
  }

  if (!keywords) {
    res.status(400);
    throw new Error('Keywords is required');
  }

  const existedBlog = await Blog.findOne({ title });

  if (existedBlog) {
    res.status(400);
    throw new Error('Choose another title');
  }

  const fullName = req.user.firstName + ' ' + req.user.lastName;

  const createdBlog = await Blog.create({
    authorId: req.user.id,
    title,
    content,
    author: fullName,
    keywords,
  });

  res.status(201).json({ message: 'Blog created', createdBlog });
});

// Update blog
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const { title, content, keywords } = req.body;

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  //Check if the title already exists in a blog post other than the current one
  const existingBlog = await Blog.findOne({ title, _id: { $ne: blog._id } });
  if (existingBlog) {
    res.status(400);
    throw new Error('Choose another title. This title already exists.');
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.keywords = keywords || blog.keywords;

  const updatedBlog = await blog.save();

  res.status(200).json({ message: 'Blog updated', updatedBlog });
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne({ _id: blog._id });
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

//######## Liking and Disliking System Endpoints ########

// Add Like to a blog post
const likeBlogPost = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const connectedUserId = req.user.id;

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Check if the user has already liked the post
  const likedIndex = blog.likes.indexOf(connectedUserId);
  const dislikedIndex = blog.dislikes.indexOf(connectedUserId);

  if (likedIndex !== -1) {
    // User has already liked the post
    return res
      .status(400)
      .json({ message: 'You have already liked this post' });
  } else if (dislikedIndex !== -1) {
    // User has disliked the post, so they want to remove the dislike and add a like
    blog.dislikes.pull(connectedUserId);
    blog.likes.addToSet(connectedUserId);
  } else {
    // User hasn't liked or disliked the post, so they want to like it
    blog.likes.addToSet(connectedUserId);
  }

  // Save the updated blog post
  await blog.save();

  res.status(200).json({ message: 'Blog post liked successfully', blog });
});

// Remove Like from a blog post
const removeLikeFromBlogPost = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const connectedUserId = req.user.id;

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Check if the user has liked the post
  const likedIndex = blog.likes.indexOf(connectedUserId);

  if (likedIndex === -1) {
    res.status(400);
    throw new Error('You have not liked this post');
  }

  // Remove the user's ID from the likes array
  blog.likes.splice(likedIndex, 1);

  // Save the updated blog post
  await blog.save();

  res.status(200).json({ message: 'Like removed successfully', blog });
});

// Add dislike to a blog post
const dislikeBlogPost = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const connectedUserId = req.user.id;

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Check if the user has already disliked the post
  const dislikedIndex = blog.dislikes.indexOf(connectedUserId);
  const likedIndex = blog.likes.indexOf(connectedUserId);

  if (dislikedIndex !== -1) {
    // User has already disliked the post
    return res
      .status(400)
      .json({ message: 'You have already disliked this post' });
  } else if (likedIndex !== -1) {
    // User has liked the post, so they want to remove the like and add a dislike
    blog.likes.pull(connectedUserId);
    blog.dislikes.addToSet(connectedUserId);
  } else {
    // User hasn't liked or disliked the post, so they want to dislike it
    blog.dislikes.addToSet(connectedUserId);
  }

  // Save the updated blog post
  await blog.save();

  res.status(200).json({ message: 'Blog post disliked successfully', blog });
});

// Remove dislike from a blog post
const removeDislikeFromBlogPost = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const connectedUserId = req.user.id;

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Check if the user has disliked the post
  const dislikedIndex = blog.dislikes.indexOf(connectedUserId);

  if (dislikedIndex === -1) {
    res.status(400);
    throw new Error('You have not disliked this post');
  }

  // Remove the user's ID from the dislikes array
  blog.dislikes.splice(dislikedIndex, 1);

  // Save the updated blog post
  await blog.save();

  res.status(200).json({ message: 'Dislike removed successfully', blog });
});

//######## Commenting System Endpoints ########

//add a comment
const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const blog = await Blog.findById(req.params.id);
  const connectedUserId = req.user.id;
  const connectedUser = req.user.firstName + ' ' + req.user.lastName;

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  const comment = {
    commenterId: connectedUserId,
    commenter: connectedUser,
    content,
  };

  blog.comments.push(comment);
  await blog.save();

  res.status(201).json({ message: 'Comment added successfully', comment });
});

//remove a comment
const removeComment = asyncHandler(async (req, res) => {
  const { id, commentId } = req.params;
  const connectedUserId = req.user.id;

  // Find the blog post by ID to validate its existence
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Find the comment by ID to validate its existence
  const comment = blog.comments.id(commentId);
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  // Check if the logged-in user is the author of the blog post or the commenter
  const isBlogAuthor =
    req.user && req.user.id.toString() === blog.authorId.toString();
  const isCommentAuthor =
    req.user && req.user.id.toString() === comment.commenterId.toString();

  if (!isBlogAuthor && !isCommentAuthor) {
    res.status(403);
    throw new Error('You are not authorized to delete this comment');
  }

  blog.comments = blog.comments.filter((c) => c.id !== commentId);

  await blog.save();

  res.json({ message: 'Comment removed successfully' });
});

// get all blog post's comments

const getAllComments = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  const comments = blog.comments;
  res.status(200).json(comments);
});

export {
  getUserBlog,
  getAllBlogs,
  addBlog,
  getBlogById,
  deleteBlog,
  updateBlog,
  likeBlogPost,
  removeLikeFromBlogPost,
  dislikeBlogPost,
  removeDislikeFromBlogPost,
  addComment,
  removeComment,
  getAllComments,
};
