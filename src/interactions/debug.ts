import { InteractionCommand } from '../types';

export default {
    name: 'debug',
    run: (interaction) => {
        return interaction.reply({
            content: 'Pong!',
            ephemeral: true,
        });
    },
} as InteractionCommand;