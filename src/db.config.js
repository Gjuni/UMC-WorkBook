import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const prisma = new PrismaClient();

dotenv.config();

export const pool = mysql.createPool( {
    host : process.env.DB_HOST || "localhost",
    user : process.env.DB_USER || "root",
    port : process.env.DB_PORT || "3306",
    database : process.env.DB_NAME || "umc_7th",
    password : process.env.DB_PASSWORD || "password",
    waitForConnections :true,
    connectionLimit : 10,
    queueLimit : 0,
});