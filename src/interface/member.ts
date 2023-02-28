export interface Member {
    access_level: number;
    created_at?: Date;
    created_by?: CreatedBy;
    expires_at?: null;
    id: number;
    username: string;
    name: string;
    state: string;
    avatar_url: string;
    web_url: string;
    membership_state: string;
}

export interface CreatedBy {
    id: number;
    username: string;
    name: string;
    state?: string;
    avatar_url?: string;
    web_url?: string;
}

