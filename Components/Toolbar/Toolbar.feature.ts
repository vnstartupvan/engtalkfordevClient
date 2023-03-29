import { RoomInfoPayload } from './../../libs/models/room';
import { fetchRoomURL } from '@libs/api/room';
import env from '@constants/env';

export const handleCreateRoom = async (room: RoomInfoPayload) => {
    const newRoom = await fetchRoomURL(room);
    const roomURL = newRoom.url;
    window.open(`${env.appUrl}/room/${roomURL}`);
    return newRoom;
};
