export const bodyToUser = (body) => {
    return {
        email: body.email,
        name: body.name,
        gender: body.gender,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
    };
};

export const responseFromUser = (body) => {
    const perferFoods = preferences.map(
        (perference) => perference.foodCategory.name
    );

    return {
        email : User.email,
        name : User.name,
        perferCategory : perferFoods,
    };
};



  // user id가 없는 에러를 출력
  export const nonUser = data => {
    if(!data) {
      throw new HttpException(
        404,
        "User not found"
      );
    }
  };
  
