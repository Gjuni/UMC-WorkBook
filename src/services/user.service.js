import { nonUser } from "../DTO/user.DTO.js";
import { userReposiotryInfo, userReposiotrySignUp } from "../respositories/user.repositories.js";


export const userServicesSignUp = async (userId) => {
    const user = await userReposiotrySignUp({
        email: userId.email,
        name: userId.name,
        gender: userId.gender,
        address: userId.address,
        detailAddress: userId.spec_address,
    });

    console.log("service", user);
    if(!user) {
        throw new nonUser;
    }
    return user;
};


export const userServicesInfo = async (userId) => {
    const user = await userReposiotryInfo(userId);
    console.log("service", user);
    if(!user) {
        throw new nonUser();
    }
    return user;
};