import React, { useEffect, useState } from 'react';
import RoomItem from '../RoomItem/RoomItem';
import { RoomsWrapper } from './styled';
import { fetchRoomList } from '@libs/api/room';
import { IRoom } from 'libs/models/room';
import { useSocketContext } from 'contexts/Socket';
import { StyledSpin } from 'overides/overrides';

function RoomList() {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const {
        SocketState: { newRoomSignal },
        SocketDispatch,
        SocketEmitEvents,
    } = useSocketContext();
    console.log(newRoomSignal);

    const handleGetRoomList = async () => {
        setIsLoading(true);
        try {
            const roomList = await fetchRoomList();
            console.log(roomList);
            setRooms(roomList);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    console.info('Re-render Room List: ', newRoomSignal);
    useEffect(() => {
        if (newRoomSignal) {
            handleGetRoomList();
            SocketEmitEvents.afterHandleSignal();
        }
    }, [newRoomSignal]);

    useEffect(() => {
        handleGetRoomList();
    }, []);
    console.log(rooms);
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
