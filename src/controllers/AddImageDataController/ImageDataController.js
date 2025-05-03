// imageDataController.js
const pool = require('../../db');

// ➤ Get All Images (READ)
exports.getAllImages = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM image_data');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images', message: error.message });
  }
};

// ➤ Get Image by ID (READ)
exports.getImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM image_data WHERE img_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Image not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching image', message: error.message });
  }
};

// ➤ Create a New Image (CREATE)
exports.createImage = async (req, res) => {
  const { image_name } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO image_data (image_name) VALUES (?)', [image_name]);
    res.json({ id: result.insertId, message: 'Image added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding image', message: error.message });
  }
};

// ➤ Update an Image (UPDATE)
exports.updateImage = async (req, res) => {
  const { id } = req.params;
  const { image_name } = req.body;
  try {
    const [result] = await pool.query('UPDATE image_data SET image_name = ? WHERE img_id = ?', [image_name, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Image not found' });
    res.json({ message: 'Image updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating image', message: error.message });
  }
};

// ➤ Delete an Image (DELETE)
exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM image_data WHERE img_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Image not found' });
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting image', message: error.message });
  }
};
