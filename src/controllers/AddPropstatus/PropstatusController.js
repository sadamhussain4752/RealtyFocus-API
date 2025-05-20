// PropstatusController.js
const pool = require('../../db');

// ➤ Get All Property Statuss (READ)
exports.getAllPropstatuss = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM prop_status');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Property Statuss', message: error.message });
  }
};

// ➤ Create a New Property Status (CREATE)
exports.createPropstatus = async (req, res) => {
  const { status } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO prop_status (status) VALUES (?)',
      [status]
    );
    res.json({ id: result.insertId, message: 'Property Status added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding Property Status', message: error.message });
  }
};

// ➤ Update a Property Status (UPDATE)
exports.updatePropstatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE prop_status SET status = ? WHERE status_id = ?',
      [status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Property Status not found' });
    }
    res.json({ message: 'Property Status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating amenity', message: error.message });
  }
};


// ➤ Delete a Property Status (DELETE)
exports.deletePropstatus = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM prop_status WHERE status_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Property Status not found' });
    }
    res.json({ message: 'Property Status deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Property Status', message: error.message });
  }
};