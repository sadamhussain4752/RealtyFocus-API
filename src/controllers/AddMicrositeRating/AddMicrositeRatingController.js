const pool = require('../../db');

// Get all microsite ratings
exports.getAllMicrositeRatings = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM microsite_rating');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching microsite ratings', message: error.message });
  }
};

// Get microsite rating by ID
exports.getMicrositeRatingById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM microsite_rating WHERE ratingId = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Microsite rating not found' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching microsite rating', message: error.message });
  }
};

// Create a new microsite rating
exports.createMicrositeRating = async (req, res) => {
  try {
    const {
      micrositeId, micrositeName, userName, userEmail, social, img, locationRating,
      amenitiesRating, layoutRating, safetyRating, builderRating, qualityRating,
      specificationsRating, coming_from, createdDate, adminStatus
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO microsite_rating 
      (micrositeId, micrositeName, userName, userEmail, social, img, locationRating,
      amenitiesRating, layoutRating, safetyRating, builderRating, qualityRating,
      specificationsRating, coming_from, createdDate, adminStatus) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        micrositeId, micrositeName, userName, userEmail, social, img, locationRating,
        amenitiesRating, layoutRating, safetyRating, builderRating, qualityRating,
        specificationsRating, coming_from, createdDate, adminStatus
      ]
    );

    res.status(201).json({ message: 'Microsite rating created successfully', ratingId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating microsite rating', message: error.message });
  }
};

// Update microsite rating by ID
exports.updateMicrositeRating = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      micrositeId, micrositeName, userName, userEmail, social, img, locationRating,
      amenitiesRating, layoutRating, safetyRating, builderRating, qualityRating,
      specificationsRating, coming_from, createdDate, adminStatus
    } = req.body;

    const [result] = await pool.query(
      `UPDATE microsite_rating SET 
      micrositeId = ?, micrositeName = ?, userName = ?, userEmail = ?, social = ?, img = ?, 
      locationRating = ?, amenitiesRating = ?, layoutRating = ?, safetyRating = ?, builderRating = ?, 
      qualityRating = ?, specificationsRating = ?, coming_from = ?, createdDate = ?, adminStatus = ? 
      WHERE ratingId = ?`,
      [
        micrositeId, micrositeName, userName, userEmail, social, img, locationRating,
        amenitiesRating, layoutRating, safetyRating, builderRating, qualityRating,
        specificationsRating, coming_from, createdDate, adminStatus, id
      ]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Microsite rating not found' });

    res.status(200).json({ message: 'Microsite rating updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating microsite rating', message: error.message });
  }
};

// Delete microsite rating by ID
exports.deleteMicrositeRating = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM microsite_rating WHERE ratingId = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Microsite rating not found' });

    res.status(200).json({ message: 'Microsite rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting microsite rating', message: error.message });
  }
};
