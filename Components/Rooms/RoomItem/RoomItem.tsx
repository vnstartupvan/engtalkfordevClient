import { IRoom } from '@libs/models/room';
import React from 'react';
import { useSelector } from 'react-redux';
import { RoomWrapper, Header, UserList, StyledButton, Avatar } from './styled';
import { RootState } from 'libs/redux/store';

export interface IComponentProps {
    room: IRoom;
}
const RoomItem: React.FC<IComponentProps> = ({ room }) => {
    const myProfile = useSelector((state: RootState) => state.auth.myProfile);
    const { topic, users, url } = room;

    const handleJoinRoom = () => {
        if (!myProfile) {
            alert('Please Log in to join our community!');
            return;
        }
        window.open(`http://localhost:3000/room/${url}`);
    };

    return (
        <RoomWrapper>
            <Header>
                <h3>{topic}</h3>
            </Header>
            <UserList>
                {users.map((user, id) => (
                    <Avatar borderType="dashed" key={id}>
                        {user.fullname}
                    </Avatar>
                ))}
            </UserList>
            <StyledButton onClick={handleJoinRoom}>
                Join and talk now!
            </StyledButton>
        </RoomWrapper>
    );
};

export default RoomItem;
