const cartRepository = require('../repository/cartRepository');
const cartItemRepository = require('../repository/cartItemRepository');
const itemRepository = require('../repository/productRepository');

class CartService {
    async updateCart(userId, items) {
        let cart = await cartRepository.findCartByUserId(userId);

        if (!cart) {
            cart = await cartRepository.createCart(userId);
        }

        for (const item of items) {
            const itemData = await itemRepository.findProductById(item.itemId);

            if (!itemData || item.quantity > itemData.stock_item) {
                throw new Error(`Item ${item.itemId} is out of stock or does not exist.`);
            }

            const existingCartItem = await cartItemRepository.findCartItem(cart.cartId, item.itemId);

            if (existingCartItem) {
                if (item.quantity === 0) {
                    await cartItemRepository.deleteCartItem(cart.cartId, item.itemId);
                } else if (item.quantity < 0) {
                    throw new Error('Invalid quantity value');
                } else {
                    await cartItemRepository.updateCartItem(cart.cartId, item.itemId, item.quantity, itemData.price * item.quantity);
                }
            } else if (item.quantity > 0) {
                await cartItemRepository.createCartItem(cart.cartId, item.itemId, item.quantity, itemData.price * item.quantity);
            }
        }
    }

    async getCart(userId) {
        return await cartRepository.getCartDetails(userId);
    }
}

module.exports = new CartService();
