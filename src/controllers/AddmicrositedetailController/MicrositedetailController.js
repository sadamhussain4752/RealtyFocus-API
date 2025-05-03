const pool = require('../../db');

// Get all microsite details
exports.getAllMicrositeDetails = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM microsite_detail');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching microsite details', message: error.message });
  }
};

// Get microsite detail by ID
exports.getMicrositeDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM microsite_detail WHERE md_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Microsite detail not found' });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching microsite detail', message: error.message });
  }
};

// Create a new microsite detail
exports.createMicrositeDetail = async (req, res) => {
  try {
    const {
      featured_image, micro_id, builder_id, am_id, bank_id, legal_id, rera, about, type_id, status_id,
      masterplan_image, locationmap_title, longitude, latitude, location_image, gallery_image,
      slider_image, adv_image, mlogo, price, max_price, min_price, rooms, address, location,
      phone, email, built_area, area_unit, totalarea
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO microsite_detail 
      (featured_image, micro_id, builder_id, am_id, bank_id, legal_id, rera, about, type_id, status_id, 
      masterplan_image, locationmap_title, longitude, latitude, location_image, gallery_image, 
      slider_image, adv_image, mlogo, price, max_price, min_price, rooms, address, location, 
      phone, email, built_area, area_unit, totalarea) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        featured_image, micro_id, builder_id, am_id, bank_id, legal_id, rera, about, type_id, status_id,
        masterplan_image, locationmap_title, longitude, latitude, location_image, gallery_image,
        slider_image, adv_image, mlogo, price, max_price, min_price, rooms, address, location,
        phone, email, built_area, area_unit, totalarea
      ]
    );

    res.status(201).json({ message: 'Microsite detail created successfully', md_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating microsite detail', message: error.message });
  }
};

// Update microsite detail by ID
exports.updateMicrositeDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      featured_image, micro_id, builder_id, am_id, bank_id, legal_id, rera, about, type_id, status_id,
      masterplan_image, locationmap_title, longitude, latitude, location_image, gallery_image,
      slider_image, adv_image, mlogo, price, max_price, min_price, rooms, address, location,
      phone, email, built_area, area_unit, totalarea
    } = req.body;

    const [result] = await pool.query(
      `UPDATE microsite_detail SET 
      featured_image = ?, micro_id = ?, builder_id = ?, am_id = ?, bank_id = ?, legal_id = ?, 
      rera = ?, about = ?, type_id = ?, status_id = ?, masterplan_image = ?, locationmap_title = ?, 
      longitude = ?, latitude = ?, location_image = ?, gallery_image = ?, slider_image = ?, 
      adv_image = ?, mlogo = ?, price = ?, max_price = ?, min_price = ?, rooms = ?, address = ?, 
      location = ?, phone = ?, email = ?, built_area = ?, area_unit = ?, totalarea = ? 
      WHERE md_id = ?`,
      [
        featured_image, micro_id, builder_id, am_id, bank_id, legal_id, rera, about, type_id, status_id,
        masterplan_image, locationmap_title, longitude, latitude, location_image, gallery_image,
        slider_image, adv_image, mlogo, price, max_price, min_price, rooms, address, location,
        phone, email, built_area, area_unit, totalarea, id
      ]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Microsite detail not found' });

    res.status(200).json({ message: 'Microsite detail updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating microsite detail', message: error.message });
  }
};

// Delete microsite detail by ID
exports.deleteMicrositeDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM microsite_detail WHERE md_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Microsite detail not found' });

    res.status(200).json({ message: 'Microsite detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting microsite detail', message: error.message });
  }
};
