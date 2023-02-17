import { fetchRoomURL } from 'apis/roomServices/room.service'
import { APIPRoomProps } from 'apis/roomServices/room.service'
export const handleCreateRoom = async (room: APIPRoomProps) => {
    const newRoom = await fetchRoomURL(room);
    const roomURL = newRoom.url;
    console.log(newRoom);
    
    window.open(`http://localhost:3000/room/${roomURL}`)
}
