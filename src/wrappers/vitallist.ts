import config from '../common/config';
import { Bot } from '../types';

interface VitallistUser {
    id: string;
    username: `${string}#${string}`;
    bio: string;
    website: string;
    github: string;
    twitter: string;
    avatar: string;
    staff: boolean;
    developer: boolean;
    bots: VitallistBot[];
}

interface VitallistBot {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    prefix: string;
    owner: string;
    ownerTag: string;
    tags: string[];
    reviewer: string;
    submittedOn: string;
    approvedOn: string;
    shortDescription: string;
    description: string;
    reviews: never[];
    shards: number;
    servers: number;
    votes: number;
    views: number;

    donate: string | null;
    banner: string | null;
    invite: string | null;
    website: string | null;
    github: string | null;
    support: string | null;
}

/**
 * Get all discord bot applications of a user submitted on vitallist.
 */
export async function getBiggestBot(userId: string): Promise<Bot | undefined> {
    const response = await fetch(`https://vitallist.xyz/api/users/${userId}`, {
        headers: {
            Authorization: config.VITALLIST_TOKEN,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const { bots } = await response.json() as VitallistUser;
        const bot = (bots || []).sort((a, b) => b.servers - a.servers)[0];

        return {
            name: bot.username,
            id: bot.id,
            servers: bot.servers,
            votes: bot.votes,
            shards: bot.shards
        };
    } else {
        return undefined;
    }
}

/**
 * Get a discord bot applications of a user submitted on vitallist.
 */
export async function getUserBot(botId: string): Promise<Bot | undefined> {
    const response = await fetch(`https://vitallist.xyz/api/bots/${botId}`, {
        headers: {
            Authorization: config.VITALLIST_TOKEN,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const bot: VitallistBot = await response.json();
        return {
            name: bot.username,
            id: bot.id,
            servers: bot.servers,
            votes: bot.votes,
            shards: bot.shards
        };
    } else {
        return undefined;
    }
}