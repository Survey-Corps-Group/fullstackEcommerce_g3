const feedbackRepository = require('../repository/feedbackRepository');

class FeedbackService {
    async addFeedback(itemId, rating, description) {
        return await feedbackRepository.createFeedback(itemId, rating, description);
    }
}

module.exports = new FeedbackService();
