import HttpException from "../middlewares/errorHandler.js";
import { storeLocationService, storeUpdateIndexService } from "../services/store.service.js";

export const handleStoreLocationInfo = async (req, res, next) => {
    try {   
        const locationinfo = req.body.index;

        const store  = await storeLocationService(locationinfo);
        
        console.log("store controller : ", store);

        if(!store) {
            throw next(new HttpException(404, "store not found"));
        }

        return res.status(200).json({ success : true, data : store });

    } catch(error) {
        next(error);
    }
};


export const handleStoreUpdateIndex = async (req, res, next) => {
    try {
        const storeInfo = req.body;

        const store = await storeUpdateIndexService(storeInfo);
        console.log("store controller : ", store);

        if(!store) {
            throw next(new HttpException(404, "Store not Found"));
        }

        return res.status(200).json({ success : true, data : store });

    } catch (error) {
        next(error);
    }
};