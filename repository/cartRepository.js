const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CartRepository {
   
    async findCartByUserId(userId) {
        return await prisma.cart.findFirst({ where: { userId } });
    }

    async createCart(userId) {
        return await prisma.cart.create({ data: { userId } });
    }

    async getCartDetails(userId) {
        return await prisma.cart.findFirst({
            where: { userId },
            include: {
                items: {
                    include: {
                        item: true
                    }
                }
            }
        });
    }
}

module.exports = new CartRepository();
