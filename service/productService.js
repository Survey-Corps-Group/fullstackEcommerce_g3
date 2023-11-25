const productRepository = require('../repository/productRepository');

class ProductService {
    async searchProductByName(name) {
        return await productRepository.findProductByName(name);
    }

    async getProductById(id) {
        return await productRepository.findProductById(id);
    }

    async addProduct(productData, imageFiles) {
        const existingProduct = await productRepository.findProductByFirstItemName(productData.item_name);
        if (existingProduct) {
            throw new Error("Product with the same name already exists");
        }

        const imagePaths = imageFiles.map(file => file.path);
        return await productRepository.createProduct(productData, imagePaths);
    }

    async getProducts(queryParams) {
        const { products, rating, sort } = await productRepository.findProducts(queryParams);

        let filteredProducts = products;

        // Filtering by rating
        if (rating) {
            const ratingThreshold = parseFloat(rating);
            filteredProducts = filteredProducts.filter(
                product => calculateSummaryRating(product.feedbacks) >= ratingThreshold
            );
        }

        // Sorting logic
        if (sort === "best-selling") {
            filteredProducts.sort((a, b) => b.feedbacks.length - a.feedbacks.length);
        }

        // Transforming the data
        const transformedProducts = filteredProducts.map(product => ({
            item_id: product.item_id,
            item_name: product.item_name,
            price: product.price,
            description: product.description,
            color: product.color,
            package_weight: product.package_weight,
            stock_item: product.stock_item,
            feedback_id: product.feedbacks.map(fb => fb.feedback_id),
            summary_rating: calculateSummaryRating(product.feedbacks),
            warehouse_id: product.WarehouseItem.map(wh => wh.warehouse_id),
            images: product.images.map(img => img.image_url),
        }));

        return transformedProducts;
    }

    calculateSummaryRating(feedbacks) {
        if (!feedbacks.length) return 0;
        const totalRating = feedbacks.reduce((acc, fb) => acc + fb.rating, 0);
        return totalRating / feedbacks.length;
    }

    async editProduct(itemId, productData, imageFiles) {
        const imagePaths = imageFiles ? imageFiles.map(file => file.path) : [];
        return await productRepository.updateProduct(itemId, productData, imagePaths);
    }

    async removeProduct(itemId) {
        await productRepository.deleteProduct(itemId);
    }
}

module.exports = new ProductService();
