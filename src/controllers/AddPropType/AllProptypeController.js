// ProptypeController.js
const pool = require('../../db');

// ➤ Get All Property Types (READ)
exports.getAllProptypes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM prop_type');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Property Types', message: error.message });
  }
};

// ➤ Create a New Property Type (CREATE)
exports.createProptype = async (req, res) => {
  const { type } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO prop_type (type) VALUES (?)',
      [type]
    );
    res.json({ id: result.insertId, message: 'Property Type added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding Property Type', message: error.message });
  }
};

// ➤ Update a Property Type (UPDATE)
exports.updateProptype = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE prop_type SET type = ? WHERE type_id = ?',
      [type, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Property Type not found' });
    }
    res.json({ message: 'Property Type updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating amenity', message: error.message });
  }
};


// ➤ Delete a Property Type (DELETE)
exports.deleteProptype = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM prop_type WHERE type_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Property Type not found' });
    }
    res.json({ message: 'Property Type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Property Type', message: error.message });
  }
};