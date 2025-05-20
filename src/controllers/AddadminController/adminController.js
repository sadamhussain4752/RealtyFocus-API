const pool = require("../../db");

// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, username, email, role, status, f_name, l_name, last_login, date FROM admin");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
};

// Add admin
exports.addAdmin = async (req, res) => {
    try {
        const { username, email, password, role, status, f_name, l_name } = req.body;
        await pool.query(
            "INSERT INTO admin (username, email, password, role, status, f_name, l_name, date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
            [username, email, password, role, status, f_name, l_name]
        );
        res.json({ message: "User added" });
    } catch (error) {
        res.status(500).json({ error: "Insert error" });
    }
};

// Update admin
exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, email, f_name, l_name, role, status } = req.body;

    try {
        await pool.query(
            `UPDATE admin SET 
                username = COALESCE(?, username),
                email = COALESCE(?, email),
                f_name = COALESCE(?, f_name),
                l_name = COALESCE(?, l_name),
                role = COALESCE(?, role),
                status = COALESCE(?, status)
            WHERE id = ?`,
            [username, email, f_name, l_name, role, status, id]
        );
        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating admin:", error);
        res.status(500).json({ error: "Failed to update admin" });
    }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM admin WHERE id=?", [id]);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: "Delete error" });
    }
};
