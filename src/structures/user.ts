import mongoose from 'mongoose';
import { DiscordData } from '../types';

const schema = new mongoose.Schema<User>({
    user: { type: String, required: true, unique: true },
    bot: { type: String },

    tokens: {
        access_token: { type: String },
        expires_at: { type: Number },
        refresh_token: { type: String },
    },

    provider: { type: String, required: true, default: 'topgg' },
});

export interface User {
    user: string;
    bot: string;

    tokens: DiscordData;

    provider: 'topgg'
}

export const UserModel = mongoose.model('user', schema);