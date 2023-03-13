import config from '../common/config';
import { Bot } from '../types';

interface DiscordlistUser {
    id: string;
    username: string;
    discriminator: number;
    avatar: string;
    displayName: string;
    bio: string;
    slug: string;
    flags: string;
    createdOn: string;
    banner: string;
    bots: string[];
    coOwnedBots: string[];
    packs: string[];
    adminGuilds: string[];
    guilds: string[];
    coOwnedGuilds: string[];
    claps: string;
}


interface DiscordlistBot {
    flags: number;
    botId?: string;
    features: number;
    id: string;
    username: string;
    avatar: string;
    discriminator: number;
    prefix: string;
    isPackable: boolean;
    isHidden: boolean;
    isForcedIntoHiding: boolean;
    inviteUrl: string;
    webhookUrl?: string;
    webhookAuth?: string;
    websiteUrl: string;
    repoUrl: string;
    twitterUrl: string;
    instagramUrl: string;
    supportServerUrl: string;
    slug: string;
    tags: string[];
    createdOn: string;
    ownerId: string;
    coOwnerIds: string[];
    briefDescription: string;
    longDescription: string;
    guildCount: number;
    votes: number;
    allTimeVotes: number;
}

/**
 * Get all discord bot applications of a user submitted on discordlist.gg.
 */
export async function getBiggestBot(userId: string): Promise<Bot | undefined> {
    const response = await fetch(`https://api.discordlist.gg/v0/users/${userId}`, {
        headers: {
            Authorization: config.DISCORDLIST_TOKEN,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const user = await response.json() as DiscordlistUser;

        const bots: Bot[] = [];
        for await (const botId of user.bots) {
            const bot = await getUserBot(botId);
            if (bot) bots.push(bot);
        }

        const bot = (bots || []).sort((a, b) => b.servers - a.servers)[0];

        return bot;
    } else {
        return undefined;
    }
}

/**
 * Get a discord bot applications of a user submitted on discordlist.gg.
 */
export async function getUserBot(botId: string): Promise<Bot | undefined> {
    const response = await fetch(`https://api.discordlist.gg/v0/bots/${botId}`, {
        headers: {
            Authorization: config.DISCORDLIST_TOKEN,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const bot: DiscordlistBot = await response.json();
        return {
            name: bot.username,
            id: bot.id,
            servers: bot.guildCount,
            votes: bot.votes,
            shards: 1
        };
    } else {
        return undefined;
    }
}