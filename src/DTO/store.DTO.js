
export const nonStore = data => {
    if(!data) {
      throw new HttpException(
        404,
        "Store not found"
      );
    }
  };


  
export const exsistStore = data => {
  if(!data) {
    throw new HttpException(
      400,
      "Store already exists"
    );
  }
};


  export const storeToDto = (req, res) => {
    return {
      name : storeToDto.name,
      address : storeToDto.address
    }
  };
