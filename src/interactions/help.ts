import { InteractionCommand } from '../types';
import { Embed } from 'interactions.js';

export default {
    name: 'help',
    run: (interaction) => {

        const embed = new Embed()
            .setDescription(`
*[watch a video](https://youtu.be/CGOk58DOdPc)*

**How to setup disc.http linked role**
*Note that this is a one-time setup*
> \`1.\` [Invite the bot](https://discord.com/api/oauth2/authorize?client_id=950123696251604993&permissions=67488832&redirect_uri=https%3A%2F%2Fdischttp.cc%2Flinked-role&scope=bot%20applications.commands) to your Discord server.
> \`2.\` Go to your server's role settings and create a new role.
> \`3.\` Click on the "Links" option, click on "Add requirement" and select "discord.http".
> \`4.\` Save all the changes and leave the settings.
> \`5.\` 🎉 Done with setup!

**Connect to your profile**
*Note that every user has to follow this*
> \`1.\` Click on the server name.
> \`2.\` Click on "Linked Roles".
> \`3.\` Click on the tab with the same name as the role you created.
> \`4.\` Go through the oAuth2 process.
> \`5.\` 🎉 Done with the conenction!

**⚠️ Your bot has to be submitted on a supported bot listing site.**
Use </provider:1084202078215348355> to change the data source.
                    `)
            .setColor('#5b65b7')
            .setImage('https://c.lunish.nl/r/39qhNX.png');

        return interaction.editReply({
            embeds: [embed],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 5,
                            label: 'Add disc.http',
                            url: 'https://discord.com/api/oauth2/authorize?client_id=950123696251604993&permissions=67488832&redirect_uri=https%3A%2F%2Fdischttp.cc%2Flinked-role&scope=bot%20applications.commands',
                            emoji: {
                                name: 'icons_link',
                                id: '859388126875484180'
                            },
                        },
                        {
                            type: 2,
                            style: 5,
                            label: 'Need Help?',
                            url: 'https://discord.gg/yYd6YKHQZH',
                            emoji: {
                                name: 'icons_Discord',
                                id: '866329296020701218'
                            },
                        },
                        {
                            type: 2,
                            style: 5,
                            label: 'Replace MEE6!',
                            url: 'https://discord.com/oauth2/authorize?client_id=857230367350063104&permissions=1376470297718&scope=bot+applications.commands',
                            emoji: {
                                name: 'c_prideblob',
                                id: '932368100832202783'
                            },
                        },
                    ],
                },
            ],
        });
    },
} as InteractionCommand;