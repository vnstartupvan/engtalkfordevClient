import React, { useEffect, useState } from 'react';
import RoomItem from '../RoomItem/RoomItem';
import { RoomsWrapper } from './styled';
import { fetchRoomList } from '@libs/api/room';
import { IRoom } from 'libs/models/room';
import { StyledSpin } from 'overides/overrides';
import {
    initiateSocket,
    roomsSignal,
    disconnectSocket,
    refreshRooms,
    createRoom,
    sendJoinRoom,
    userDisconnect,
    removeListeners,
} from '@libs/Socket/room-socket';
function RoomList() {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    // const handleGetRoomList = async () => {
    //     setIsLoading(true);
    //     try {
    //         const roomList = await fetchRoomList();
    //         console.log(roomList);
    //         setRooms(roomList);
    //         setIsLoading(false);
    //     } catch (error) {
    //         setIsLoading(false);
    //     }
    // };
    useEffect(() => {
        // initiateSocket();
        roomsSignal(setRooms);
    }, []);

    return (
        <RoomsWrapper>
            {!isLoading ? (
                rooms.length > 0 &&
                rooms.map((room, index) => <RoomItem key={index} room={room} />)
            ) : (
                <StyledSpin />
            )}
        </RoomsWrapper>
    );
}

export default RoomList;
