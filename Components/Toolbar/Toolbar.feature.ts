import { RoomInfoPayload } from './../../libs/models/room';
import { fetchRoomURL } from '@libs/api/room';

export const handleCreateRoom = async (room: RoomInfoPayload) => {
    const newRoom = await fetchRoomURL(room);
    const roomURL = newRoom.url;
    window.open(`${window.location.origin}/room/${roomURL}`);
    return newRoom;
};
