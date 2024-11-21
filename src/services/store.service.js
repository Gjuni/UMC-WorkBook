import { nonStore } from "../DTO/store.DTO.js";
import { storeLocationRepository, storeUpdateIndexRepository } from "../respositories/store.respositories.js";


export const storeLocationService = async(locationinfo) => {
    const store = await storeLocationRepository(locationinfo);

    if(!store) {
        throw new nonStore;
    }
    return store;
}

export const storeUpdateIndexService = async(storeInfo) => {
    const store = await storeUpdateIndexRepository({
        name : storeInfo.name,
        address : storeInfo.address,
    });

    console.log("store service : ", store);

    if(!store) {
        throw new nonStore;
    }

    return store;
}
