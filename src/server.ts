import cookieParser from 'cookie-parser';
import express from 'express';

import { getUserBot, getUserBots } from './wrappers/dblstats';
import * as discord from './wrappers/discord';
import * as storage from './common/storage';
import config from './common/config';
import mongoose from 'mongoose';
import { UserModel } from './structures/user';

const app = express();
app.use(cookieParser(config.COOKIE_SECRET));
mongoose.connect(config.MONGO_URL).catch(console.log);

/**
 * Route configured in the Discord developer console which facilitates the
 * connection between Discord and any additional services you may use.
 * To start the flow, generate the OAuth2 consent dialog url for Discord,
 * and redirect the user there.
 */
app.get('/linked-role', async (req, res) => {
    const { url, state } = discord.getOAuthUrl();
    res.cookie('clientState', state, { maxAge: 1000 * 60 * 5, signed: true });
    res.redirect(url);
});

/**
 * Route configured in the Discord developer console, the redirect Url to which
 * the user is sent after approving the bot for their Discord account. This
 */
app.get('/discord-oauth-callback', async (req, res) => {
    try {
        const { code } = req.query;
        const discordState = req.query.state;
        if (!code || !discordState) return res.sendStatus(400);

        const { clientState } = req.signedCookies;
        if (clientState !== discordState) return res.sendStatus(403);

        const tokens = await discord.getOAuthTokens(code as string);

        const meData = await discord.getUserData(tokens);
        await storage.storeDiscordTokens(meData.user.id, {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: Date.now() + tokens.expires_in * 1000
        });

        const { bots } = await getUserBots(meData.user.id);
        if (bots) {
            const biggestBot = bots.sort((a, b) => b.server_count - a.server_count)[0];
            console.log(biggestBot);
            storage.storeTopBot(meData.user.id, biggestBot.id);
        }

        await updateMetadata(meData.user.id);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

/**
 * Given a Discord UserId, push static data to the Discord metadata endpoint.
 */
async function updateMetadata(userId: string) {
    const tokens = await storage.getDiscordTokens(userId);
    if (!tokens) return;

    let metadata = {};
    try {
        const botId = await storage.getTopBot(userId);
        if (!botId) return;

        const bot = await getUserBot(botId);
        if (!bot) return;

        metadata = {
            name: bot.name,
            guilds: bot.server_count ?? 0,
            votes: bot.monthly_votes ?? 0,
        };
    } catch (e) {
        console.error(e);
    }

    await discord.pushMetadata(userId, tokens, metadata);
}

app.get('*', (req, res) => {
    res.send('👋');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);

    setInterval(async () => {
        const users = (await UserModel.find()).filter((u) => u.bot);

        users.forEach(async (user, index) => {
            setTimeout(() => {
                updateMetadata(user.user);
                console.log(`Update: ${user.user}`);
            }, ((1000 * 60 * 6) / users.length) * index);
        });

    }, 1000 * 60 * 6);
});