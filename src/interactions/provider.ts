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
        case 'dlist.gg':
            return '<:yah:982585208417161258>';
        case 'vitallist.xyz':
            return '<:VD_VitalList:1006506267319226368>';
        default:
            return '<:topgg:1017511725353939114>';
    }
}