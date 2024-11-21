import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const userReposiotrySignUp = async (userId) => {
    const user = await prisma.user.findFirst({
      where: {
        email: userId.email,
        name: userId.name,
      }
    });

  if(!user) {
    const newUser = await prisma.user.create({ 
      email: userId.email,
      name: userId.name,
      gender: userId.gender,
      address: userId.address,
      detailAddress: userId.spec_address,
    });

    console.log("repository : ", newUser);
    return newUser;
  }

  return user;
};


export const userReposiotryInfo = async (userId) => {
    const user = await prisma.user.findFirst({
        where: {
          id: userId
          }, select: {
            name: true,
            address: true,
        }
    });

    console.log("repository : ", user);

  if(!user) {
    return null;
  }

  return user;
};
