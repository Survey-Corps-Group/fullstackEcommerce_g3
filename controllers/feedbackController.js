const feedbackService = require('../service/feedbackService');

class FeedbackController {
    async createFeedback(req, res) {
        const itemId = Number(req.params.id);
        const { rating, description } = req.body;

        try {
            const newFeedback = await feedbackService.addFeedback(itemId, rating, description);
            res.json({ newFeedback });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new FeedbackController();
