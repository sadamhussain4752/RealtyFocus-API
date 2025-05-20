const jwt = require("jsonwebtoken");
const pool = require("../db");

const secretKey = process.env.SECRET_KEY || "mn1f4mfulKNrMZ0aAqbrw";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: "1d" });
};

const getNewToken = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ? AND password = ?", [email, password]);

    if (!rows.length) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const user = rows[0];
    const token = generateToken(user);
    res.json({ success: true, token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getNewToken, generateToken };
