const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CartItemRepository {
    async findCartItem(cartId, itemId) {
        return await prisma.cartItem.findUnique({
            where: {
                cartId_itemId: {
                    cartId: cartId,
                    itemId: itemId
                }
            }
        });
    }

    async createCartItem(cartId, itemId, quantity, countPrice) {
        return await prisma.cartItem.create({
            data: {
                cartId: cartId,
                itemId: itemId,
                quantity: quantity,
                count_price: countPrice
            }
        });
    }

    async updateCartItem(cartId, itemId, quantity, countPrice) {
        return await prisma.cartItem.update({
            where: {
                cartId_itemId: {
                    cartId: cartId,
                    itemId: itemId
                }
            },
            data: {
                quantity: quantity,
                count_price: countPrice
            }
        });
    }

    async deleteCartItem(cartId, itemId) {
        return await prisma.cartItem.delete({
            where: {
                cartId_itemId: {
                    cartId: cartId,
                    itemId: itemId
                }
            }
        });
    }
}

module.exports = new CartItemRepository();
