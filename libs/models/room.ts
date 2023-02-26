export interface IRoom {
    url: string;
    users: object[];
    topic: string;
    slot: number;
}

export interface RoomItemPayload {
    users: object[];
    topic: string;
    slot: number;
}

export interface RoomInfoPayload {
    id: string;
    users: {};
    userLimit: number;
    topic: string;
    language: string;
    level: string;
}