const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/AddblogController/blogController');

// ➤ Get All Blogs (READ)
router.get('/', blogController.getAllBlogs);

// ➤ Create a New Blog (CREATE)
router.post('/', blogController.createBlog);

// ➤ Update a Blog (UPDATE)
router.put('/:id', blogController.updateBlog);

// ➤ Delete a Blog (DELETE)
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
