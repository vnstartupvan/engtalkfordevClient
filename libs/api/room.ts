import { api } from '.';
import { RoomInfoPayload, IRoom } from 'libs/models/room';

export const fetchRoomURL = async (payload: RoomInfoPayload) => {
    return api.post(`/room/create`, payload) as Promise<any>;
};

export const fetchRoomList = async () => {
    return api.get(`/room/all`) as Promise<IRoom[]>;
};

export const getRoom = async (id: string, userId: string) => {
    return api.post(`/room/${id}`, {userId: userId}) as Promise<IRoom>;
};

export const joinRoom = async (userId: string) => {
    return api.post(`room`);
};
