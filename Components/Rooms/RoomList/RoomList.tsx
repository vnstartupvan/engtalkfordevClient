import React from "react";
import RoomItem from "../RoomItem/RoomItem";
import { RoomsWrapper } from './styled';

export interface componentProps {
    roomList: ({
        users: (object)[],
        topic: string,
        slot: number,
    })[];
}

function RoomList({ roomList }: componentProps) {
    return (
        <RoomsWrapper>
            {roomList.map((room, index) => <RoomItem key={index} room={room} />)}
        </RoomsWrapper>
    );
}


export default RoomList;
