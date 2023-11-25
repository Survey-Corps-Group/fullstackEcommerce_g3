const jwt = require("jsonwebtoken");

function authenticateTokenMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //biar token yg asli ga dirubah2
    if (token == null)
        return res.status(401).json({
            success: false,
            message: "No token provided.",
        });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.userId;
    req.role = user.role;
    next();
}

// mengecek apakah user sudah login atau belum
function authorizeUser(req, res, next) {
    if (req.role !== "customer" && req.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Customers only.",
        });
    }
    next();
}

// middleware admin setelah login
function authorizeAdmin(req, res, next) {
    if (req.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only.",
        });
    }
    next();
}

module.exports = { authenticateTokenMiddleware, authorizeUser, authorizeAdmin };