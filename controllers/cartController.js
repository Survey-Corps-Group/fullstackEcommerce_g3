const cartService = require('../service/cartService');

class CartController {
    async updateCart(req, res) {
        const userId = req.body.userId;
        const items = req.body.items;

        try {
            await cartService.updateCart(userId, items);
            res.json({
                success: true,
                message: "Cart updated successfully"
            });
        } catch (error) {
            console.error(error);
            const status = error.message === 'Invalid quantity value' ? 400 : 500;
            res.status(status).json({
                success: false,
                message: `Error updating cart: ${error.message}`
            });
        }
    }

    async getCart(req, res) {
        const userId = parseInt(req.params.userId);

        try {
            const cart = await cartService.getCart(userId);
            if (!cart) {
                return res.status(404).json({
                    success: false,
                    message: "Cart not found"
                });
            }

            const cartDetails = cart.items.map(cartItem => ({
                itemId: cartItem.itemId,
                quantity: cartItem.quantity,
                count_price: cartItem.count_price,
                itemName: cartItem.item.item_name
            }));

            res.json({
                success: true,
                message: "Cart retrieved successfully",
                cartId: cart.cartId,
                cartDetails
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: `Error retrieving cart: ${error.message}`
            });
        }
    }
}

module.exports = new CartController();
