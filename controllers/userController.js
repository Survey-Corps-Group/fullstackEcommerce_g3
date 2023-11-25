const userService = require('../service/userService');

class UserController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await userService.authenticateUser(username, password);
            res.json({
                success: true,
                token: token,
            });
        } catch (err) {
            let status = 400;
            if (err.message === "username doesn't exist") {
                status = 404;
            } else if (err.message === "invalid credentials") {
                status = 403;
            }
            res.status(status).json({
                success: false,
                message: err.message,
            });
        }
    }

    async register(req, res) {
        try {
            await userService.registerUser(req.body);
            res.json({
                success: true,
                message: "User registered successfully",
            });
        } catch (err) {
            let status = 400;
            if (err.message === "Email or username already exists") {
                status = 403;
            }
            res.status(status).json({
                success: false,
                message: err.message,
            });
        }
    }

    async getUsers(_, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }

    async getUserById(req, res) {
        const userId = parseInt(req.params.id);

        try {

            if (req.userId !== userId && req.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Access denied.",
                });
            }

            const user = await userService.getUserById(userId);

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }

    async updateUser(req, res) {
        const userId = parseInt(req.params.id);

        try {
            if (req.userId !== userId && req.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Access denied.",
                });
            }

            const updatedUser = await userService.updateUser(userId, req.body);

            res.json({
                success: true,
                message: "User updated successfully",
                user: {
                    user_id: updatedUser.user_id,
                    username: updatedUser.username,
                    email: updatedUser.email,
                    address: updatedUser.address,
                    full_name: updatedUser.full_name,
                    phone: updatedUser.phone
                },
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }

    async deleteUser(req, res) {
        const userId = parseInt(req.params.id);

        try {
            const deletedUser = await userService.deleteUser(userId);

            res.json({
                success: true,
                message: "User deleted successfully",
                deletedUserId: deletedUser.user_id,
            });
        } catch (err) {
            if (err.code === "P2025") {
                res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: `Server error: ${err.message}`,
                });
            }
        }
    }

    async registerAdmin(req, res) {
        try {
            await userService.registerAdmin(req.body);
            res.json({
                success: true,
                message: "Admin registered successfully",
            });
        } catch (err) {
            let status = 400;
            if (err.message === "Email or username already exists") {
                status = 403;
            }
            res.status(status).json({
                success: false,
                message: err.message,
            });
        }
    }

}

module.exports = new UserController();
