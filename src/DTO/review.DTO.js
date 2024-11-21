export const nonReview = data => {
    if(!data) {
      throw new HttpException(
        404,
        "Review not found"
      );
    }
  };
