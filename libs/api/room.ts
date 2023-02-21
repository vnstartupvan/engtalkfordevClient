import { api } from '.';
import { RoomInfoPayload, IRoom } from 'libs/models/room';

export const fetchRoomURL = async (payload: RoomInfoPayload) => {
    return api.post(`/room/create`, payload) as Promise<any>;
};

export const fetchRoomList = async () => {
    return api.get(`/room/all`) as Promise<IRoom[]>;
};
