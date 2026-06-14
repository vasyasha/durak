import dotenv from 'dotenv';
dotenv.config();

// SERVER CONFIG
export const PORT = process.env.PORT || 3000;

// GAME CONFIG
export const MAX_PLAYERS = 6;
export const MIN_PLAYERS = 2;