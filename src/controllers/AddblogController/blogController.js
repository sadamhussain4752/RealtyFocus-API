const pool = require('../../db');

// ➤ Get All Blogs (READ)
exports.getAllBlogs = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM blog');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs', message: error.message });
  }
};

// ➤ Create a New Blog (CREATE)
exports.createBlog = async (req, res) => {
  const { name, blog_date, detail, meta_title, meta_description, image, tags, blog_cat } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO blog (name, blog_date, detail, meta_title, meta_description, image, tags, blog_cat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, blog_date, detail, meta_title, meta_description, image, tags, blog_cat]
    );
    res.json({ id: result.insertId, message: 'Blog added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding blog', message: error.message });
  }
};

// ➤ Update a Blog (UPDATE)
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { name, blog_date, detail, meta_title, meta_description, image, tags, blog_cat } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE blog SET name = ?, blog_date = ?, detail = ?, meta_title = ?, meta_description = ?, image = ?, tags = ?, blog_cat = ? WHERE id = ?',
      [name, blog_date, detail, meta_title, meta_description, image, tags, blog_cat, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating blog', message: error.message });
  }
};

// ➤ Delete a Blog (DELETE)
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM blog WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting blog', message: error.message });
  }
};
