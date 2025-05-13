// bankapprovalController.js
const pool = require('../../db');

// ➤ Get All Bank Approvals (READ)
exports.getAllBankApprovals = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bankapproval');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bank approvals', message: error.message });
  }
};

// ➤ Create a New Bank Approval (CREATE)
exports.createBankApproval = async (req, res) => {
  const { name, image } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO bankapproval (name, image) VALUES (?, ?)',
      [name, image]
    );
    res.json({ id: result.insertId, message: 'Bank approval added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding bank approval', message: error.message });
  }
};

// ➤ Update a Bank Approval (UPDATE)
exports.updateBankApproval = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const imageUrl = req.fileUrls?.[0]; // only update if a new image is uploaded

  try {
    let query = 'UPDATE bankapproval SET name = ?';
    const params = [name];

    if (imageUrl) {
      query += ', image = ?';
      params.push(imageUrl);
    }

    query += ' WHERE bank_id = ?';
    params.push(id);

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bank approval not found' });
    }

    res.json({ message: 'Bank approval updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating bank approval', message: error.message });
  }
};


// ➤ Delete a Bank Approval (DELETE)
exports.deleteBankApproval = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM bankapproval WHERE bank_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bank approval not found' });
    }
    res.json({ message: 'Bank approval deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting bank approval', message: error.message });
  }
};