import { StatusCodes } from "http-status-codes";
import { userServicesInfo, userServicesSignUp } from "../services/user.service.js";
import { bodyToUser } from "../DTO/user.DTO.js";
import HttpException from "../middlewares/errorHandler.js";


export const handleUserSignUp = async (req, res, next) => {
    try {
        const userId = req.body;
        
        const user = await userServicesSignUp(bodyToUser(userId));
        console.log("body : ", user);
        
        res.status(StatusCodes.OK).success(user);
    } catch (error) {
        next(error);
    }
};


export const handleUserInfo = async (req, res, next) => {
    try {
        const userId = req.body.index;
        
        const user = await userServicesInfo(userId)
        console.log("body : ", user);

        if(!userId) {
            throw next(new HttpException(404, "User not Fount"));
        }
        
        return res.status(StatusCodes.OK).success(user);
    } catch (error) {
        next(error);
    }
};
