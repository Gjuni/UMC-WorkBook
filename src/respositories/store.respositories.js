import { PrismaClient } from "@prisma/client";
import { exsistStore, nonStore } from "../DTO/store.DTO.js";

const prisma = new PrismaClient();

export const storeLocationRepository = async (locationinfo) => {
    const store = await prisma.store.findMany({
        where : {
            address : locationinfo
        }, select : {
            name : true,
            address : true
        }
    });

    console.log("repositories : ", store);

    if(!store) {
        throw new nonStore;
    }

    return store;
}


export const storeUpdateIndexRepository = async (storeInfo) => {
    const store = await prisma.store.findFirst({
        where : {
            name : storeInfo.name,
            address : storeInfo.address
        }
    });


    if(!store) {
        const newstore = await prisma.store.create({
            data : {
                name : storeInfo.name,
                address : storeInfo.address
            }
        });

        console.log("repositories : ", newstore);
        
        return newstore;
    }else {
        console.log("repositories  Exsist : ", store);
        return exsistStore;
    }
}