const pool = require('../../db');

// Get all prices
exports.getAllPrices = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM price');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching prices', message: error.message });
  }
};

// Get price by ID
exports.getPriceById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM price WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Price not found' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching price', message: error.message });
  }
};

// Create a new price entry
exports.createPrice = async (req, res) => {
  try {
    const { type, price, micro_id, sqft, basic_cost } = req.body;

    const [result] = await pool.query(
      `INSERT INTO price (type, price, micro_id, sqft, basic_cost) 
      VALUES (?, ?, ?, ?, ?)`,
      [type, price, micro_id, sqft, basic_cost]
    );

    res.status(201).json({ message: 'Price created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating price', message: error.message });
  }
};

// Update price by ID
exports.updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, price, micro_id, sqft, basic_cost } = req.body;

    const [result] = await pool.query(
      `UPDATE price SET type = ?, price = ?, micro_id = ?, sqft = ?, basic_cost = ? 
      WHERE id = ?`,
      [type, price, micro_id, sqft, basic_cost, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Price not found' });

    res.status(200).json({ message: 'Price updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating price', message: error.message });
  }
};

// Delete price by ID
exports.deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM price WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Price not found' });

    res.status(200).json({ message: 'Price deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting price', message: error.message });
  }
};