// metaController.js
const pool = require('../../db');

// ➤ Get All Meta Entries (READ)
exports.getAllMeta = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM meta');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching meta data', message: error.message });
  }
};

// ➤ Get Meta Entry by ID (READ)
exports.getMetaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM meta WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Meta entry not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching meta entry', message: error.message });
  }
};

// ➤ Create a New Meta Entry (CREATE)
exports.createMeta = async (req, res) => {
  const { micro_id, title, meta_name, keyword, metadescription, favicon, status } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO meta (micro_id, title, meta_name, keyword, metadescription, favicon, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [micro_id, title, meta_name, keyword, metadescription, favicon, status]
    );
    res.json({ id: result.insertId, message: 'Meta entry created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating meta entry', message: error.message });
  }
};

// ➤ Update a Meta Entry (UPDATE)
exports.updateMeta = async (req, res) => {
  const { id } = req.params;
  const { micro_id, title, meta_name, keyword, metadescription, favicon, status } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE meta SET micro_id = ?, title = ?, meta_name = ?, keyword = ?, metadescription = ?, favicon = ?, status = ? WHERE id = ?',
      [micro_id, title, meta_name, keyword, metadescription, favicon, status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Meta entry not found' });
    }
    res.json({ message: 'Meta entry updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating meta entry', message: error.message });
  }
};

// ➤ Delete a Meta Entry (DELETE)
exports.deleteMeta = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM meta WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Meta entry not found' });
    }
    res.json({ message: 'Meta entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting meta entry', message: error.message });
  }
};