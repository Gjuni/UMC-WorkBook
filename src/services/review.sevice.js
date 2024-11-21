import { nonReview } from "../DTO/review.DTO";

export const updateReviewService = async (reviewBody) => {
    const review  = await updateReviewRepository({
        
    });

    if(!review) {
        throw new nonReview;
    }

    return review;
}