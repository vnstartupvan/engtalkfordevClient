import { IRoom } from '@libs/models/room';
import React from 'react';
import { RoomWrapper, Header, UserList, StyledButton, Avatar } from './styled';
export interface IComponentProps {
    room: IRoom;
}
function RoomItem({room}: IComponentProps) {
    const { topic, users, url } = room;
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
            <StyledButton>
                <a target="_blank" href={`room/${url}`}>Join and talk now!</a>
            </StyledButton>
        </RoomWrapper>
    );
}

export default RoomItem;
