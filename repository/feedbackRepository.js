const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class FeedbackRepository {
    async createFeedback(itemId, rating, description) {
        return await prisma.feedback.create({
            data: {
                item_id: itemId,
                rating,
                description,
            },
        });
    }
}

module.exports = new FeedbackRepository();
