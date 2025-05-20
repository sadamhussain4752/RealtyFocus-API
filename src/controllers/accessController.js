const pool = require("../db");

exports.getUsersWithPermissions = async (req, res) => {
    const [users] = await pool.query("SELECT id, email FROM admin WHERE role != 'superadmin'");
    const [permissions] = await pool.query("SELECT * FROM permissions");

    const data = users.map(user => {
        const userPerms = permissions.filter(p => p.user_id === user.id);
        return {
            ...user,
            permissions: userPerms.filter(p => p.type === "access").map(p => p.page),
            deletePermissions: userPerms.filter(p => p.type === "delete").map(p => p.page)
        };
    });

    res.json(data);
};

exports.getUserPermissions = async (req, res) => {
    const userId = req.params.id;
    const [permissions] = await pool.query("SELECT page,type FROM permissions WHERE user_id = ?", [userId]);
    res.json(permissions);
};

exports.updatePermissions = async (req, res) => {
    const users = req.body.users;
    await pool.query("DELETE FROM permissions");

    const inserts = [];
    users.forEach(user => {
        user.permissions.forEach(p => inserts.push([user.id, p, "access"]));
        user.deletePermissions.forEach(p => inserts.push([user.id, p, "delete"]));
    });

    if (inserts.length) {
        await pool.query("INSERT INTO permissions (user_id, page, type) VALUES ?", [inserts]);
    }

    res.send("Updated");
};



exports.getUserPermissionsById = async (req, res) => {
    try {
        const userId = req.params.id;
        const [permissions] = await pool.query(
            "SELECT page, type FROM permissions WHERE user_id = ?",
            [userId]
        );

        res.json(permissions); // returns array of { page, type }
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch permissions");
    }
};
/*

exports.updatePermissions = async (req, res) => {
    try {
        const users = req.body.users;

        await pool.query("DELETE FROM permissions");

        const permissionData = [];

        users.forEach((user) => {
            user.permissions.forEach((page) => {
                permissionData.push([user.id, page, "access"]);
            });
            user.deletePermissions.forEach((page) => {
                permissionData.push([user.id, page, "delete"]);
            });
        });

        if (permissionData.length > 0) {
            await pool.query(
                "INSERT INTO permissions (user_id, page, type) VALUES ?",
                [permissionData]
            );
        }

        res.send("Permissions updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update permissions");
    }
};
*/