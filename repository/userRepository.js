const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserRepository {
    constructor() {
        this.prisma = prisma;
    }

    async findUserByUsername(username) {
        return await this.prisma.user.findUnique({ where: { username } });
    }

    async findUserByEmailOrUsername(email, username) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
    }

    async createUser(userData) {
        return await prisma.user.create({
            data: userData,
        });
    }

    async findAllUsers() {
        return await this.prisma.user.findMany({
            select: {
                user_id: true,
                username: true,
                email: true,
                address: true,
                full_name: true,
                phone: true,
                role: true,
            },
        });
    }

    async findUserById(userId) {
        return await this.prisma.user.findUnique({
            where: {
                user_id: userId,
            },
            select: {
                username: true,
                email: true,
                password: true,
                address: true,
                full_name: true,
                phone: true
            },
        });
    }

    async updateUser(userId, updateData) {
        return await this.prisma.user.update({
            where: { user_id: userId },
            data: updateData,
        });
    }

    async deleteUser(userId) {
        return await this.prisma.user.delete({
            where: { user_id: userId },
        });
    }

}

module.exports = new UserRepository();
