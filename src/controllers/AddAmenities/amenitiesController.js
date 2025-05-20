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

// Create a new amenity
exports.createAmenity = async (req, res) => {
  try {
    const { name } = req.body;
    let image = null;

    if (req.file) {
      image = await firebaseMulterHandler(req.file.buffer, req.file.originalname, "amenities");
    }

    const [result] = await pool.query(
      "INSERT INTO amenities (name, image) VALUES (?, ?)",
      [name, image]
    );

    res.json({ id: result.insertId, message: "Amenity added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding amenity", message: error.message });
  }
};

// Update existing amenity
exports.updateAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let imageUrl = req.body.image; // Keep old image if no new upload

    if (req.file) {
      imageUrl = await firebaseMulterHandler(req.file.buffer, req.file.originalname, "amenities");
    }

    const [result] = await pool.query(
      "UPDATE amenities SET name = ?, image = ? WHERE am_id = ?",
      [name, imageUrl, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Amenity not found" });

    res.json({ message: "Amenity updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating amenity", message: error.message });
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
