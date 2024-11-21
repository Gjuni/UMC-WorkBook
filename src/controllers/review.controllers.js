import HttpException from "../middlewares/errorHandler";
import { updateReviewService } from "../services/review.sevice";


export const handleReviewUpdateIndex = async (req, res, next) => {
    try {
        const reviewBody = req.body;

        const review = await updateReviewService(reviewBody);

        if(!review) {
            throw next(new HttpException(404, "Review not found"));
        }
        console.log("Review controller : ", review);

        return res.status(200).json({ success : true, data : review});
    } catch(error) {
        next(error);
    }
}