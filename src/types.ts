import type Interaction from 'interactions.js/typings/structures/Interaction';

export interface OAuth2TokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export interface OAuth2UserInfo {
    application: {
        id: string;
        name: string;
        icon: string | null;
        description: string;
        summary: string;
        type: string | null;
        hook: boolean;
        bot_public: boolean;
        bot_require_code_grant: boolean;
        verify_key: string;
        flags: number;
    };
    scopes: string[];
    expires: string;
    user: {
        id: string;
        username: string;
        avatar: string;
        avatar_decoration: string | null;
        discriminator: string;
        public_flags: number;
    };
}

export interface DiscordData {
    access_token: string;
    expires_at: number;
    refresh_token: string;
}

export interface Bot {
    name: string;
    id: string;
    servers: number;
    votes: number;
    shards: number;
}

export interface InteractionCommand {
    name: string;
    aliases: string[];
    i18n: {
        name: string;
        type: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    };
    run: (interaction: Interaction) => Promise<void>;
}