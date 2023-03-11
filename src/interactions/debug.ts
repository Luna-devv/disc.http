import { InteractionCommand } from '../types';

export default {
    name: 'debug',
    run: (interaction) => {
        return interaction.editReply({
            content: 'Pong!'
        });
    },
} as InteractionCommand;