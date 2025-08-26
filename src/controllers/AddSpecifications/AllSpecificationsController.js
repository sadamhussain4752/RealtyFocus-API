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
  const { name } = req.body;

  const urls = req.uploadedUrls || {};

  const image = urls?.image?.[0] || '';

  /*if (!req.fileUrls || req.fileUrls.length === 0) {
    return res.status(400).json({ error: 'Image upload failed or not provided' });
  }

  const image = req.fileUrls[0];*/

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
  const { name } = req.body;

  //const image = req.fileUrls?.[0] || null;

  const urls = req.uploadedUrls || {};

  const image = urls?.image?.[0] || '';

  try {
    let query = 'UPDATE specifications SET name = ?';
    const params = [name];

    if (image) {
      query += ', image = ?';
      params.push(image);
    }

    query += ' WHERE id = ?';
    params.push(id);

    const [result] = await pool.query(query, params);

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



/******************************** Specification *********************** */


exports.getAllDetailSpecifications = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM specification');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Specifications', message: error.message });
  }
};

// ➤ Create a New Specifications (CREATE)
exports.createDetailSpecifications = async (req, res) => {
  const { micro_id, sp_id, description } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO specification (micro_id, sp_id, description) VALUES (?, ?, NOW())',
      [micro_id, sp_id, description]
    );

    res.json({ id: result.insertId, message: 'Specifications added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding Specifications', message: error.message });
  }
};

// ➤ Update an Specifications (UPDATE)
exports.updateDetailSpecifications = async (req, res) => {
  const { id } = req.params;
  const { micro_id, sp_id, description } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE specification SET micro_id = ? , sp_id = ? , description = ? WHERE id = ?',
      [micro_id, sp_id, description, id]
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
exports.deleteDetailSpecifications = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM specification WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Specifications not found' });
    }
    res.json({ message: 'Specifications deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Specifications', message: error.message });
  }
};