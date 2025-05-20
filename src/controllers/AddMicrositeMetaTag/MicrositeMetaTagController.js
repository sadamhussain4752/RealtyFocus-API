// MicrositeMetaTagsController.js
const pool = require('../../db');

// ➤ Get All Microsite Meta Tagss (READ)
exports.getAllMicrositeMetaTags = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM meta');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Microsite Meta Tagss', message: error.message });
  }
};

// ➤ Create a New Microsite Meta Tags (CREATE)
exports.createMicrositeMetaTag = async (req, res) => {
  const {
    micro_id,
    title,
    meta_name,
    keyword,
    metadescription,
    favicon = '', // Set null if not provided
    status = 'Disable' // Default to "Disable" if not provided
  } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO meta (`micro_id`, `title`, `meta_name`, `keyword`, `metadescription`, `favicon`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [micro_id, title, meta_name, keyword, metadescription, favicon, status]
    );
    res.json({ id: result.insertId, message: 'Microsite Meta Tags added successfully' });
  } catch (error) {
    res.status(500).json({
      error: 'Error adding Microsite Meta Tags',
      message: error.message,
    });
  }
};

// ➤ Update a Microsite Meta Tags (UPDATE)
exports.updateMicrositeMetaTag = async (req, res) => {
  const { id } = req.params;
  const {
    micro_id,
    title,
    meta_name,
    keyword,
    metadescription,
    favicon = null,
    status,
  } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE meta SET micro_id = ?, title = ?, meta_name = ?, keyword = ?, metadescription = ?, favicon = ?, status = ? WHERE id = ?',
      [micro_id, title, meta_name, keyword, metadescription, favicon, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Microsite Meta Tags not found' });
    }

    res.json({ message: 'Microsite Meta Tags updated successfully' });
  } catch (error) {
    res.status(500).json({
      error: 'Error updating Microsite Meta Tags',
      message: error.message,
    });
  }
};



// ➤ Delete a Microsite Meta Tags (DELETE)
exports.deleteMicrositeMetaTag = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM meta WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Microsite Meta Tags not found' });
    }
    res.json({ message: 'Microsite Meta Tags deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Microsite Meta Tags', message: error.message });
  }
};