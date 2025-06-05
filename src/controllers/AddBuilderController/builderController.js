const pool = require('../../db');

// ➤ Get All Builders (READ)
exports.getAllBuilders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM builder');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching builders', message: error.message });
  }
};

// ➤ Get Single Builder by ID (READ)
exports.getBuilderById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM builder WHERE builder_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Builder not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching builder', message: error.message });
  }
};

// ➤ Create a New Builder (CREATE)
exports.createBuilder = async (req, res) => {
  const { name, address, about } = req.body;

  const urls = req.uploadedUrls || {};

  const logo = urls?.logo?.[0] || '';

  try {
    const [result] = await pool.query(
      'INSERT INTO builder (name, logo, address, about) VALUES (?, ?, ?, ?)',
      [name, logo, address, about]
    );
    res.json({ id: result.insertId, message: 'Builder added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding builder', message: error.message });
  }
};

// ➤ Update a Builder (UPDATE)
exports.updateBuilder = async (req, res) => {
  const { id } = req.params;
  const { name, address, about } = req.body;

  const urls = req.uploadedUrls || {};

  const logo = urls?.logo?.[0] || '';

  try {
    const [result] = await pool.query(
      'UPDATE builder SET name = ?, logo = ?, address = ?, about = ? WHERE builder_id = ?',
      [name, logo, address, about, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Builder not found' });
    }
    res.json({ message: 'Builder updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating builder', message: error.message });
  }
};

// ➤ Delete a Builder (DELETE)
exports.deleteBuilder = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM builder WHERE builder_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Builder not found' });
    }
    res.json({ message: 'Builder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting builder', message: error.message });
  }
};
