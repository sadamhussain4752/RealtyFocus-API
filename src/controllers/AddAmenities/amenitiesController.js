// amenitiesController.js
const pool = require('../../db');

// ➤ Get All Amenities (READ)
exports.getAllAmenities = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM amenities');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching amenities', message: error.message });
  }
};

// ➤ Create a New Amenity (CREATE)
exports.createAmenity = async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO amenities (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.json({ id: result.insertId, message: 'Amenity added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding amenity', message: error.message });
  }
};

// ➤ Update an Amenity (UPDATE)
exports.updateAmenity = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE amenities SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Amenity not found' });
    }
    res.json({ message: 'Amenity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating amenity', message: error.message });
  }
};

// ➤ Delete an Amenity (DELETE)
exports.deleteAmenity = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM amenities WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Amenity not found' });
    }
    res.json({ message: 'Amenity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting amenity', message: error.message });
  }
};
