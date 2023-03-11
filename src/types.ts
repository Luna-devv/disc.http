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

export interface TopggUser {
    id: string;
    avatar: string | null;
    def_avatar: string;
    tag: `${string}#${string}`;
}

export interface TopggBot {
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