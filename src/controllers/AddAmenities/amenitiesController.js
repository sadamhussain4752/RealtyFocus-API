// controllers/AddAmenities/amenitiesController.js
const pool = require("../../db");
const { firebaseMulterHandler } = require("../../firebase/firebaseSetup");

// Get all amenities
exports.getAllAmenities = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM amenities");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching amenities", message: error.message });
  }
};
/*
// Create a new amenity
exports.createAmenity = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/amenities/${req.file.filename}` : null;

    const [result] = await pool.query(
      "INSERT INTO amenities (name, image) VALUES (?, ?)",
      [name, image]
    );

    res.json({ id: result.insertId, message: "Amenity added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding amenity", message: error.message });
  }
};*/


exports.createAmenity = async (req, res) => {
  try {
    const { name } = req.body;

    const urls = req.uploadedUrls || {};

    const image = urls?.image?.[0] || '';

    //console.log("Uploaded image URL:", image);

    const [result] = await pool.query(
      "INSERT INTO amenities (name, image) VALUES (?, ?)",
      [name, image]
    );

    res.json({ id: result.insertId, message: "Amenity added successfully" });
  } catch (error) {
    console.error("Error adding amenity:", error);
    res.status(500).json({ error: "Error adding amenity", message: error.message });
  }
};

// Update existing amenity
exports.updateAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Amenity name is required" });
    }

    const image = req.uploadedUrls?.image?.[0] || null;

    const fields = ["name = ?"];
    const values = [name];

    if (image) {
      fields.push("image = ?");
      values.push(image);
    }

    values.push(id);

    const sql = `UPDATE amenities SET ${fields.join(", ")} WHERE am_id = ?`;

    const [result] = await pool.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Amenity not found" });
    }

    res.json({ message: "Amenity updated successfully" });
  } catch (error) {
    console.error("❌ Error updating amenity:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};




// Delete amenity
exports.deleteAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM amenities WHERE am_id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Amenity not found" });

    res.json({ message: "Amenity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting amenity", message: error.message });
  }
};
