import config from '../common/config';
import { TopggBot, TopggUser } from '../types';

/**
 * Get all discord bot applications of a user submitted on topgg.
 */
export async function getUserBots(userId: string): Promise<{ user: TopggUser | undefined, bots: TopggBot[] | undefined }> {
    const response = await fetch(`https://dblstatistics.com/api/users/${userId}/bots`, {
        headers: {
            Authorization: config.TOPGG_TOKEN,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const bots: { user: TopggUser, bots: TopggBot[] } = await response.json();
        return bots;
    } else {
        return {
            user: undefined,
            bots: undefined
        };
    }
}

/**
 * Get a discord bot applications of a user submitted on topgg.
 */
export async function getUserBot(botId: string): Promise<TopggBot | undefined> {
    const response = await fetch(`https://dblstatistics.com/api/bots/${botId}`, {
        headers: {
            Authorization: config.TOPGG_TOKEN,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const bot: TopggBot = await response.json();
        return bot;
    } else {
        return undefined;
    }
}