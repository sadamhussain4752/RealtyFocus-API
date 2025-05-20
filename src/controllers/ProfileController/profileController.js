const pool = require("../../db");
const { generateToken } = require("../authController");

const updateProfile = async (req, res) => {
    const { f_name, l_name, email, currentPassword, newPassword, confirmPassword } = req.body;
    const id = req.params.id;

    try {
        const [users] = await pool.query("SELECT * FROM admin WHERE id = ?", [id]);
        const user = users[0];

        if (!user) return res.status(404).json({ message: "User not found" });

        if (currentPassword && currentPassword !== user.password) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        if (newPassword && newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        const updatedPassword = newPassword ? newPassword : user.password;

        await pool.query(
            "UPDATE admin SET f_name = ?, l_name = ?, email = ?, password = ? WHERE id = ?",
            [f_name, l_name, email, updatedPassword, id]
        );

        const updatedUser = { ...user, f_name, l_name, email, password: updatedPassword };

        // Generate new token
        const token = generateToken(updatedUser);

        res.json({ message: "Profile updated", user: updatedUser, token });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { updateProfile };
