import config from '../common/config';

/**
 * Register the metadata to be stored by Discord. This should be a one time action.
 * Note: uses a Bot token for authentication, not a user token.
 */

const body = [
    {
        key: 'guilds',
        name: 'Guilds',
        description: 'How many guilds the bot is in',
        type: 2,
    },
    {
        key: 'votes',
        name: 'Votes',
        description: 'How many votes the bot has',
        type: 2,
    }
];

fetch(`https://discord.com/api/v10/applications/${config.DISCORD_CLIENT_ID}/role-connections/metadata`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${config.DISCORD_TOKEN}`,
    },
}).then(async (response) => {
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        const data = await response.text();
        console.log(data);
    }
});