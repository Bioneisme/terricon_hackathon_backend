import dotenv from "dotenv";
dotenv.config();

export const DB_URI: string = process.env.DB_URI || 'postgres://postgres:root@postgres:5432/postgres';
export const SERVER_PORT: number = +(process.env.SERVER_PORT || 5000);
export const JWT_SECRET: string = process.env.JWT_SECRET || 'someSecretKey33485';
export const CLIENT_URL: string = process.env.CLIENT_URL || 'http://localhost:3000';
export const AI_ENDPOINT: string = process.env.AI_ENDPOINT as string;
export const AI_API_KEY: string = process.env.AI_API_KEY as string;
export const CLOUD_NAME: string = process.env.CLOUD_NAME as string;
export const CLOUD_API_KEY: string = process.env.CLOUD_API_KEY as string;
export const CLOUD_API_SECRET: string = process.env.CLOUD_API_SECRET as string;