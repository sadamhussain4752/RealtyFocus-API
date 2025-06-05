// LegalapprovalController.js
const pool = require('../../db');

// ➤ Get All Legal Approvals (READ)
exports.getAllLegalApprovals = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM legalapproval');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Legal approvals', message: error.message });
  }
};

// ➤ Create a New Legal Approval (CREATE)
exports.createLegalApproval = async (req, res) => {
  const { name } = req.body;

  const urls = req.uploadedUrls || {};

  const image = urls?.image?.[0] || '';

  try {
    const [result] = await pool.query(
      'INSERT INTO legalapproval (name, image) VALUES (?, ?)',
      [name, image]
    );
    res.json({ id: result.insertId, message: 'Legal approval added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding Legal approval', message: error.message });
  }
};

// ➤ Update a Legal Approval (UPDATE)
exports.updateLegalApproval = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.uploadedUrls?.image?.[0] || null;

  try {
    const fields = ['name = ?'];
    const values = [name];

    if (image) {
      fields.push('image = ?');
      values.push(image);
    }

    values.push(id); // for WHERE clause

    const query = `UPDATE legalapproval SET ${fields.join(', ')} WHERE legal_id = ?`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Legal approval not found' });
    }

    res.json({ message: 'Legal approval updated successfully' });
  } catch (error) {
    console.error('❌ Error updating Legal approval:', error);
    res.status(500).json({ error: 'Error updating Legal approval', message: error.message });
  }
};



// ➤ Delete a Legal Approval (DELETE)
exports.deleteLegalApproval = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM legalapproval WHERE legal_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Legal approval not found' });
    }
    res.json({ message: 'Legal approval deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Legal approval', message: error.message });
  }
};