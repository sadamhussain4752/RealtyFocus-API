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
  const { name, image } = req.body;
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
  const imageUrl = req.fileUrls?.[0]; // only update if a new image is uploaded

  try {
    let query = 'UPDATE legalapproval SET name = ?';
    const params = [name];

    if (imageUrl) {
      query += ', image = ?';
      params.push(imageUrl);
    }

    query += ' WHERE legal_id = ?';
    params.push(id);

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Legal approval not found' });
    }

    res.json({ message: 'Legal approval updated successfully' });
  } catch (error) {
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