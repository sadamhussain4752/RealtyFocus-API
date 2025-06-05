const pool = require('../../db');

// ➤ Get All Floor Plans (READ)
exports.getAllFloorPlans = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM floor_plan');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching floor plans', message: error.message });
  }
};

// ➤ Get Floor Plan by ID (READ)
exports.getFloorPlanById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM floor_plan WHERE id_floor = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Floor plan not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching floor plan', message: error.message });
  }
};

// ➤ Create a New Floor Plan (CREATE)
exports.createFloorPlan = async (req, res) => {
  const { micro_id, title } = req.body;

  const urls = req.uploadedUrls || {};

  const image = urls?.image?.[0] || '';

  try {
    const [result] = await pool.query(
      'INSERT INTO floor_plan (micro_id, title, image) VALUES (?, ?, ?)',
      [micro_id, title, image]
    );
    res.json({ id: result.insertId, message: 'Floor plan created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating floor plan', message: error.message });
  }
};

// ➤ Update a Floor Plan (UPDATE)
exports.updateFloorPlan = async (req, res) => {
  const { id } = req.params;
  const { micro_id, title } = req.body;

  // Get the uploaded image if available

  const urls = req.uploadedUrls || {};

  const image = urls?.image?.[0] || '';

  try {
    let query = 'UPDATE floor_plan SET micro_id = ?, title = ?';
    const params = [micro_id, title];

    if (image) {
      query += ', image = ?';
      params.push(image);
    }

    query += ' WHERE id_floor = ?';
    params.push(id);

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Floor plan not found' });
    }

    res.json({ message: 'Floor plan updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating floor plan', message: error.message });
  }
};


// ➤ Delete a Floor Plan (DELETE)
exports.deleteFloorPlan = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM floor_plan WHERE id_floor = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Floor plan not found' });
    }
    res.json({ message: 'Floor plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting floor plan', message: error.message });
  }
};
