const productService = require('../service/productService');

class ProductController {

    async addProduct(req, res) {
        const productData = req.body;
        try {
            const newProduct = await productService.addProduct(productData, req.files);
            res.status(201).json({
                success: true,
                message: "Product created successfully",
                product: newProduct,
            });
        } catch (error) {
            if (error.message === "Product with the same name already exists") {
                return res.status(409).json({
                    success: false,
                    message: error.message,
                });
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getProducts(req, res) {
        const queryParams = req.query;

        try {
            const products = await productService.getProducts(queryParams);
            res.json({ products, page: parseInt(queryParams.page || 1) });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: `Server error: ${error.message}`,
            });
        }
    }

    async searchByName(req, res) {
        const productName = req.params.name;
        
        try {
            const productByName = await productService.searchProductByName(productName);

            if (productByName.length > 0) {
                res.json({ productByName });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: `Server error: ${error.message}`,
            });
        }
    }

    async getProductById(req, res) {
        const id = req.params.id;

        try {
            const productById = await productService.getProductById(id);

            if (productById) {
                res.json({ productById });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: `Server error: ${error.message}`,
            });
        }
    }

    async editProduct(req, res) {
        const itemId = parseInt(req.params.itemId);
        const productData = req.body;

        try {
            const updatedProduct = await productService.editProduct(itemId, productData, req.files);
            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                product: updatedProduct,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteProduct(req, res) {
        const itemId = parseInt(req.params.id);

        try {
            await productService.removeProduct(itemId);
            res.status(200).json({
                success: true,
                message: "Product and related data deleted successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async listOrders(req, res) {
        try {
            const orders = await salesOrderService.listOrders();
            res.json({ success: true, orders });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}

module.exports = new ProductController();
