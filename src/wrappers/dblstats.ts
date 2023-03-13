import config from '../common/config';
import { Bot } from '../types';

interface TopggUser {
    id: string;
    avatar: string | null;
    def_avatar: string;
    tag: `${string}#${string}`;
}

interface TopggBot {
    certified: boolean;
    owners: string[];
    deleted: boolean;
    id: string;
    name: string;
    def_avatar: string;
    avatar: string | null;
    short_desc: string;
    lib: string | null;
    prefix: string;
    website: string | null;
    approved_at: Date | null;
    monthly_votes: number;
    server_count: number;
    total_votes: number;
    shard_count: number;
    monthly_votes_rank: number;
    server_count_rank: number;
    total_votes_rank: number;
    shard_count_rank: number;
    timestamp: Date;
    unix_timestamp: number;
}

/**
 * Get all discord bot applications of a user submitted on topgg.
 */
export async function getBiggestBot(userId: string): Promise<Bot | undefined> {
    const response = await fetch(`https://dblstatistics.com/api/users/${userId}/bots`, {
        headers: {
            Authorization: config.TOPGG_TOKEN,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const { bots } = await response.json() as { user: TopggUser, bots: TopggBot[] };
        const bot = (bots || []).sort((a, b) => b.server_count - a.server_count)[0];

        return {
            name: bot.name,
            id: bot.id,
            servers: bot.server_count,
            votes: bot.monthly_votes,
            shards: bot.shard_count
        };
    } else {
        return undefined;
    }
}

/**
 * Get a discord bot applications of a user submitted on topgg.
 */
export async function getUserBot(botId: string): Promise<Bot | undefined> {
    const response = await fetch(`https://dblstatistics.com/api/bots/${botId}`, {
        headers: {
            Authorization: config.TOPGG_TOKEN,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const bot: TopggBot = await response.json();
        return {
            name: bot.name,
            id: bot.id,
            servers: bot.server_count,
            votes: bot.monthly_votes,
            shards: bot.shard_count
        };
    } else {
        return undefined;
    }
}