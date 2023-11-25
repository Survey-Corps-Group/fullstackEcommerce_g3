const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repository/userRepository');

class UserService {
    async authenticateUser(username, password) {
        const user = await userRepository.findUserByUsername(username);
        if (!user) {
            throw new Error("username doesn't exist");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("invalid credentials");
        }

        const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            process.env.JWT_SECRET, { expiresIn: '1h'}
        );

        return token;
    }

    async registerUser(userData) {
        const { username, email, password } = userData;

        // Mengecek apakah user sudah ada
        const existingUser = await userRepository.findUserByEmailOrUsername(email, username);
        if (existingUser) {
            throw new Error("Email or username already exists");
        }

        // Hash password dan membuat user baru
        const hashedPassword = await bcrypt.hash(password, 10);
        await userRepository.createUser({
            ...userData,
            password: hashedPassword,
            role: 'customer',
        });
    }

    async getAllUsers() {
        return await userRepository.findAllUsers();
    }

    async getUserById(userId) {
        return await userRepository.findUserById(userId);
    }

    async updateUser(userId, userData) {
        let updateData = {};

        if (userData.username) updateData.username = userData.username;
        if (userData.email) updateData.email = userData.email;
        if (userData.password) updateData.password = await bcrypt.hash(userData.password, 10);
        if (userData.address) updateData.address = userData.address;
        if (userData.full_name) updateData.full_name = userData.full_name;
        if (userData.phone) updateData.phone = userData.phone;

        return await userRepository.updateUser(userId, updateData);
    }

    async deleteUser(userId) {
        return await userRepository.deleteUser(userId);
    }

    async registerAdmin(userData) {
        const { username, email, password } = userData;

        const existingUser = await userRepository.findUserByEmailOrUsername(email, username);
        if (existingUser) {
            throw new Error("Email or username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userRepository.createUser({
            ...userData,
            password: hashedPassword,
            role: 'admin', // Set role as 'admin'
        });
    }

}

module.exports = new UserService();
