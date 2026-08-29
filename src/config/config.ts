import { config as conf } from "dotenv";
import { env } from "node:process";

conf()

const _config ={
    port: process.env.PORT,
    dataBaseurl: process.env.MONGO_URI,
    env: process.env.NODE_ENV,
};


export const config = Object.freeze(_config);

// config.ts-এ .env-এর সব গুরুত্বপূর্ণ সেটিং এক জায়গায় রাখা হয়, যাতে পুরো project থেকে সহজে ব্যবহার করা যায় এবং ভুল করে পরিবর্তন করা না যায়।