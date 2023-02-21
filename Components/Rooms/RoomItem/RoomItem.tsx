import React from 'react';
import { RoomWrapper, Header, UserList, Bottom, Avatar } from './styled';
export interface componentRoomProps {
    room: {
        users: object[];
        topic: string;
        slot: number;
    };
}

function RoomItem({ room }: componentRoomProps) {
    const { topic, users } = room;
    return (
        <RoomWrapper>
            <Header>
                <h3>{topic}</h3>
            </Header>
            <UserList>
                {/* {users.map((user, id) => (
                    <Avatar borderType="dashed" key={id} />
                ))} */}
            </UserList>
            <Bottom>Join and talk now!</Bottom>
        </RoomWrapper>
    );
}

export default RoomItem;
