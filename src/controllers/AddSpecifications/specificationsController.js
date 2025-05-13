// SpecificationsController.js
const pool = require('../../db');

// ➤ Get All Specifications (READ)
exports.getAllSpecifications = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM specifications');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Specifications', message: error.message });
  }
};

// ➤ Create a New Specifications (CREATE)
exports.createSpecifications = async (req, res) => {
  const { name, image } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO specifications (name, image, date) VALUES (?, ?, NOW())',
      [name, image]
    );

    res.json({ id: result.insertId, message: 'Specifications added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding Specifications', message: error.message });
  }
};

// ➤ Update an Specifications (UPDATE)
exports.updateSpecifications = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE specifications SET name = ? , image = ? WHERE id = ?',
      [name, image, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Specifications not found' });
    }
    res.json({ message: 'Specifications updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating Specifications', message: error.message });
  }
};

// ➤ Delete an Specifications (DELETE)
exports.deleteSpecifications = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM specifications WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Specifications not found' });
    }
    res.json({ message: 'Specifications deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Specifications', message: error.message });
  }
};
