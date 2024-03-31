export type User = {
    id: number;
    code: string;
    name: string;
    email: string;
    gender: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    position_id: number;
};
