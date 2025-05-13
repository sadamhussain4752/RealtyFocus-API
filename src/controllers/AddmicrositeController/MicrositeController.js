// controllers/micrositeController.js
const pool = require('../../db');

// Get all microsites
exports.getAllMicrosites = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM microsite');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching microsites', message: error.message });
  }
};

// Get all microsites in descending order with pagination, optionally filtering for featured microsites

exports.getAllMicrositesByID = async (req, res) => {
  try {
    const { project_type, page = 1, limit = 10 } = req.query; // Get query parameters
    const offset = (page - 1) * limit; // Calculate offset for pagination
    let query = `
      SELECT m.*, md.*, b.* , ty.*
      FROM microsite m
      LEFT JOIN microsite_detail md ON m.micro_id = md.micro_id
      LEFT JOIN builder b ON md.builder_id = b.builder_id 
      LEFT JOIN prop_type ty ON md.type_id = ty.type_id 
       
    `;
    let params = [];

    if (project_type) {
      query += ` WHERE m.project_type = ?`;
      params.push(project_type);
    }

    query += ` ORDER BY m.micro_id DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);

    // Get total count for pagination info
    let countQuery = 'SELECT COUNT(*) AS total FROM microsite';
    if (project_type) {
      countQuery += ' WHERE project_type = ?';
    }

    const [countRows] = await pool.query(countQuery, project_type ? [project_type] : []);
    const total = countRows[0].total;

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching microsites', message: error.message });
  }
};



// Get microsite by Name with its details
// URL: /api/microsite/:name
exports.getMicrositeByName = async (req, res) => {
  try {

    const { name: slug } = req.params;
    const name = slug.replace(/-/g, ' ');

    // Query using the 'name' param
    const [micrositeRows] = await pool.query('SELECT * FROM microsite WHERE name = ?', [name]);

    if (micrositeRows.length === 0) {
      return res.status(404).json({ message: 'Microsite not found' });
    }

    const microsite = micrositeRows[0];

    // Get microsite details
    const [detailsRows] = await pool.query(
      'SELECT * FROM microsite_detail WHERE micro_id = ?',
      [microsite.micro_id]
    );
    microsite.details = detailsRows.length > 0 ? detailsRows[0] : [];

    // Get pricing info
    const [priceRows] = await pool.query(
      'SELECT * FROM price WHERE micro_id = ?',
      [microsite.micro_id]
    );
    microsite.price = priceRows.length > 0 ? priceRows : [];


    const [floorRows] = await pool.query(
      'SELECT * FROM `floor_plan` WHERE `micro_id` = ?',
      [microsite.micro_id]
    );
    microsite.floorplan = floorRows.length > 0 ? floorRows : [];


    const amIds = microsite.details.am_id
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));

    const placeholders = amIds.map(() => '?').join(',');
    const [amenitiesRows] = await pool.query(
      `SELECT * FROM \`amenities\` WHERE \`am_id\` IN (${placeholders})`,
      amIds
    );

    microsite.amenities = amenitiesRows.length > 0 ? amenitiesRows : [];




    res.status(200).json(microsite);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching microsite', message: error.message });
  }
};
exports.getMicrositesByBuilderID = async (req, res) => {
  try {
    const { builder_id } = req.params;

    if (!builder_id) {
      return res.status(400).json({ error: 'builder_id is required' });
    }

    const query = `
      SELECT m.*, md.*,  ty.*
      FROM microsite m
      LEFT JOIN microsite_detail md ON m.micro_id = md.micro_id
      LEFT JOIN builder b ON md.builder_id = b.builder_id
      LEFT JOIN prop_type ty ON md.type_id = ty.type_id
      WHERE b.builder_id = ?
      ORDER BY m.micro_id DESC
    `;

    const [rows] = await pool.query(query, [builder_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No microsites found for this builder' });
    }

    res.status(200).json({
      total: rows.length,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching microsites for builder', message: error.message });
  }
};
/*
// Get microsite by ID with its details
exports.getMicrositeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the microsite details
    const [micrositeRows] = await pool.query('SELECT * FROM microsite WHERE micro_id = ?', [id]);

    if (micrositeRows.length === 0) {
      return res.status(404).json({ message: 'Microsite not found' });
    }

    const microsite = micrositeRows[0];


    // Fetch microsite details using md_id
    const [detailsRows] = await pool.query('SELECT * FROM microsite_detail WHERE micro_id = ?', [microsite.micro_id]);

    // Include details in the response
    microsite.details = detailsRows.length > 0 ? detailsRows[0] : [];


    // Fetch microsite details using md_id
    const [PriceRows] = await pool.query('SELECT * FROM price WHERE micro_id = ?', [microsite.micro_id]);

    // Include details in the response
    microsite.price = PriceRows.length > 0 ? PriceRows : [];

    res.status(200).json(microsite);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching microsite', message: error.message });
  }
};

*/

// Create a new microsite
exports.createMicrosite = async (req, res) => {
  try {
    const {
      name,
      possession,
      project_type,
      rera_no,
      possession_date,
      no_of_units,
      total_area,
      location,
      sub_location,
      zone,
      city,
      sprice
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO microsite 
      (name, possession, project_type, rera_no, possession_date, no_of_units, total_area, location, sub_location, zone, city, sprice) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, possession, project_type, rera_no, 'null', no_of_units, total_area, location, sub_location, zone, city, sprice]
    );

    res.status(201).json({ message: 'Microsite created successfully', micro_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating microsite', message: error.message });
  }
};

// Update microsite by ID
exports.updateMicrosite = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      possession,
      project_type,
      rera_no,
      possession_date,
      no_of_units,
      total_area,
      location,
      sub_location,
      zone,
      city,
      sprice
    } = req.body;

    const [result] = await pool.query(
      `UPDATE microsite 
      SET name = ?, possession = ?, project_type = ?, rera_no = ?, possession_date = ?, no_of_units = ?, 
          total_area = ?, location = ?, sub_location = ?, zone = ?, city = ?, sprice = ? 
      WHERE micro_id = ?`,
      [name, possession, project_type, rera_no, possession_date, no_of_units, total_area, location, sub_location, zone, city, sprice, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Microsite not found' });

    res.status(200).json({ message: 'Microsite updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating microsite', message: error.message });
  }
};

// Delete microsite by ID
exports.deleteMicrosite = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM microsite WHERE micro_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Microsite not found' });

    res.status(200).json({ message: 'Microsite deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting microsite', message: error.message });
  }
};
