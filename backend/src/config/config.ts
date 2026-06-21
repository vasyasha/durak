import dotenv from 'dotenv';
dotenv.config();

// SERVER CONFIG
export const PORT: number = parseInt(process.env.PORT ?? '3000');