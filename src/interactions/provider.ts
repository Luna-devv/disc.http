import { InteractionCommand } from '../types';

import * as storage from '../common/storage';
import { User } from '../structures/user';

export default {
    name: 'provider',
    run: (interaction) => {
        const provider = interaction.options.getStringOption('platform');

        storage.storeProvider(interaction.user.id.toString(), provider.value);

        return interaction.editReply({
            content: `You have successfully switched your stats provider to **${getEmote(provider.value)} ${provider.value}**!`
        });
    },
} as InteractionCommand;

function getEmote(provider: User['provider']): string {
    switch (provider) {
        case 'topgg':
            return '<:topgg:1017511725353939114>';
    }
}