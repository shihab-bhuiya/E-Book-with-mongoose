import { config as conf } from "dotenv";


conf()

const _config ={
    port: process.env.PORT,
    dataBaseurl: process.env.MONGO_URI,
    env: process.env.NODE_ENV,
    JwtSecrect: process.env.JWT_SECRET,
    CloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    CloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    CloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};


export const config = Object.freeze(_config);

// config.ts-এ .env-এর সব গুরুত্বপূর্ণ সেটিং এক জায়গায় রাখা হয়, যাতে পুরো project থেকে সহজে ব্যবহার করা যায় এবং ভুল করে পরিবর্তন করা না যায়।