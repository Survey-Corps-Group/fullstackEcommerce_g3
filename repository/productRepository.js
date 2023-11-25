const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductRepository {

    async findProducts(queryParams) {
        const { page, item_name, price, rating, sort } = queryParams;
        const limit = 10;
        const offset = page ? (page - 1) * limit : 0;

        const products = await prisma.item.findMany({
            skip: offset,
            take: limit,
            where: {
                item_name: item_name ? { contains: item_name } : undefined,
                price: price ? { equals: parseFloat(price) } : undefined,
            },
            include: {
                images: { select: { image_url: true } },
                feedbacks: true,
                WarehouseItem: true,
            },
        });

        return { products, rating, sort };
    }

    async findProductByName(name) {
        return await prisma.item.findMany({
            where: { 
                item_name: { 
                    contains: name,
                    mode: 'insensitive'
                }
            }
        });
    }

    async findProductByFirstItemName(item_name) {
        return await prisma.item.findFirst({
            where: { item_name },
        });
    }

    async createProduct(data, imagePaths) {
        const newProduct = await prisma.item.create({ data });

        if (imagePaths && imagePaths.length > 0) {
            await Promise.all(imagePaths.map(async imagePath => {
                await prisma.itemImage.create({
                    data: {
                        item_id: newProduct.item_id,
                        image_url: imagePath.replace("\\", "/"), // Fix path for Windows
                    },
                });
            }));
        }

        return newProduct;
    }

    async findProductById(id) {
        return await prisma.item.findUnique({
            where: { item_id: Number(id) },
        });
    }

    async updateProduct(itemId, data, imagePaths) {
        // Update product information
        const updatedProduct = await prisma.item.update({
            where: { item_id: itemId },
            data: data,
        });

        // Handle images
        await prisma.itemImage.deleteMany({ where: { item_id: itemId } });

        if (imagePaths && imagePaths.length > 0) {
            await prisma.itemImage.createMany({
                data: imagePaths.map(imagePath => ({
                    item_id: itemId,
                    image_url: imagePath.replace("\\", "/"), // Fix path for Windows
                })),
            });
        }

        return updatedProduct;
    }

    async deleteProduct(itemId) {
        await prisma.itemImage.deleteMany({ where: { item_id: itemId } });
        await prisma.item.delete({ where: { item_id: itemId } });
    }

}

module.exports = new ProductRepository();
