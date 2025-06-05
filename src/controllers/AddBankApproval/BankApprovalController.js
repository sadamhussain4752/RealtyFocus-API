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
  const { name } = req.body;

  const urls = req.uploadedUrls || {};

  const image = urls?.image?.[0] || '';

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

  // Handle uploaded image
  const image = req.uploadedUrls?.image?.[0] || null;

  try {
    const fields = ["name = ?"];
    const values = [name];

    if (image) {
      fields.push("image = ?");
      values.push(image);
    }

    values.push(id); // Add the id for WHERE clause

    const query = `UPDATE bankapproval SET ${fields.join(", ")} WHERE bank_id = ?`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bank approval not found' });
    }

    res.json({ message: 'Bank approval updated successfully' });
  } catch (error) {
    console.error("❌ Error updating bank approval:", error);
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