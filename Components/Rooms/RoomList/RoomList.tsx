import React, { useEffect, useState } from 'react';
import RoomItem from '../RoomItem/RoomItem';
import { RoomsWrapper } from './styled';
import apis from 'apis/apis';
import { IRoom } from 'Models/room';
import { useSocketContext } from 'contexts/Socket';
import { StyledSpin } from 'overides/overrides';

function RoomList() {
    const [roomList, setroomList] = useState<IRoom[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const {
        SocketState: { newRoomSignal },
        SocketDispatch,
        SocketEmitEvents,
    } = useSocketContext();
    console.log(newRoomSignal);

    const fetchRoomList = async () => {
        setIsLoading(true);
        try {
            const roomList = await apis.fetchRoomList();
            setroomList(roomList);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    console.info('Re-render Room List: ', newRoomSignal);
    useEffect(() => {
        if (newRoomSignal) {
            fetchRoomList();
            SocketEmitEvents.afterHandleSignal();
        }
    }, [newRoomSignal]);

    useEffect(() => {
        fetchRoomList();
    }, []);
    return (
        <RoomsWrapper>
            {!isLoading ? (
                roomList.map((room, index) => (
                    <RoomItem key={index} room={room} />
                ))
            ) : (
                <StyledSpin />
            )}
        </RoomsWrapper>
    );
}

export default RoomList;
