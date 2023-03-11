import * as dotenv from 'dotenv';

/**
 * Load environment variables from a .env file, if it exists.
 */

dotenv.config();

const config = {
    MONGO_URL: process.env.MONGO_URL as string,
    TOPGG_TOKEN: process.env.TOPGG_TOKEN as string,
    DISCORD_TOKEN: process.env.DISCORD_TOKEN as string,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI as string,
    COOKIE_SECRET: process.env.COOKIE_SECRET as string,
};

export default config;