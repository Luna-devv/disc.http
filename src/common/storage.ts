import { UserModel } from '../structures/user';
import { DiscordData, InteractionCommand } from '../types';

/**
 * Stores Discord's token data in a database for later use.
 */

export async function storeDiscordTokens(userId: string, tokens: DiscordData) {
    let user = await UserModel.findOne({ user: userId });
    if (!user) user = await UserModel.create({ user: userId });

    user.tokens = tokens;
    await user.save();
}

export async function getDiscordTokens(userId: string): Promise<DiscordData | undefined> {
    const user = await UserModel.findOne({ user: userId });
    return user?.tokens;
}

/**
 * Stores the biggest bot of a user gattered after the oAuth2 process.
 */

export async function storeTopBot(userId: string, botId: string) {
    let user = await UserModel.findOne({ user: userId });
    if (!user) user = await UserModel.create({ user: userId });

    user.bot = botId;
    await user.save();
}

export async function getTopBot(userId: string): Promise<string | undefined> {
    const user = await UserModel.findOne({ user: userId });
    return user?.bot;
}

/**
 * Stores all application commands.
 */

const commandStore = new Map<string, InteractionCommand>();

export async function storeCommand(command: InteractionCommand) {
    await commandStore.set(command.name ?? '', command);
}

export async function getCommand(name: string): Promise<InteractionCommand | undefined> {
    return await commandStore.get(name);
}