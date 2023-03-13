import type Interaction from 'interactions.js/typings/structures/Interaction';
import { Application } from 'interactions.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import express from 'express';

import * as dblstats from './wrappers/dblstats';
import * as discordlist from './wrappers/discordlist';
import * as vitallist from './wrappers/vitallist';
import * as discord from './wrappers/discord';

import { User, UserModel } from './structures/user';

import * as storage from './common/storage';
import config from './common/config';

import commandLoader from './common/commandLoader';

const app = express();
app.use(cookieParser(config.COOKIE_SECRET));
mongoose.connect(config.MONGO_URL).catch(console.log);

/**
 * Initializes a HTTP bot client using interactions.js to reply to
 * interaction commands (/) inside of discord.
 */
const client = new Application({
    botToken: config.DISCORD_TOKEN,
    publicKey: config.DISCORD_PUBLIC_KEY,
    applicationId: config.DISCORD_CLIENT_ID,
    port: 1337
});
commandLoader();
client.start();

client.on('interactionCreate', async (interaction: Interaction) => {
    interaction.deferReply(true);

    const command = await storage.getCommand(interaction.commandName || 'debug');
    if (!command) return;

    command.run(interaction);
});


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

        const user = await storage.getUser(meData.user.id);
        const bot = await getProvider(user?.provider || 'top.gg').getBiggestBot(meData.user.id);
        if (bot) {
            console.log(`Created: ${bot.name}; ${bot.servers} guilds; ${bot.votes} votes (${bot.id})`);
            storage.storeTopBot(meData.user.id, bot.id);
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
    const user = await storage.getUser(userId);
    if (!user) return;

    let platform = {
        name: 'Unnamed',
        username: 'top.gg'
    };
    let metadata = {
        guilds: 0,
        votes: 0,
    };

    try {
        const botId = await storage.getTopBot(userId);
        if (!botId) return;

        const bot = await getProvider(user.provider).getUserBot(botId);
        if (!bot) return;

        console.log(`Update: ${bot.name}; ${bot.servers} guilds; ${bot.votes} votes; ${user.provider} (${bot.id})`);

        platform = {
            name: bot.name,
            username: user.provider
        };

        metadata = {
            guilds: bot.servers,
            votes: bot.votes,
        };
    } catch (e) {
        console.error(e);
    }

    await discord.pushMetadata(userId, user.tokens, platform, metadata);
}

function getProvider(provider: User['provider']) {
    switch (provider) {
        case 'dlist.gg':
            return discordlist;
        case 'vitallist.xyz':
            return vitallist;

        default:
            return dblstats;
    }
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
            setTimeout(() => updateMetadata(user.user), ((1000 * 60 * 60) / users.length) * index);
        });

    }, 1000 * 60 * 60);
});