import { IRoom } from '@libs/models/room';
import React from 'react';
import { useSelector } from 'react-redux';
import { RoomWrapper, Header, UserList, StyledButton, Avatar } from './styled';
import { RootState } from 'libs/redux/store';
import AppLogo from 'Components/Commons/AppLogo';
import {
    SettingOutlined,
    PhoneOutlined,
    StopOutlined,
} from '@ant-design/icons';
import { IUserResponse } from '@libs/models/user';
import { Utils } from '@utils/common/Utils';

export interface IComponentProps {
    room: IRoom;
}
const RoomItem: React.FC<IComponentProps> = ({ room }) => {
    const myProfile = useSelector((state: RootState) => state.auth.myProfile);
    const { topic, users, url, language, level, userLimit } = room;

    const handleJoinRoom = () => {
        if (!myProfile) {
            alert('Please Log in to join our community!');
            return;
        }
        window.open(`http://localhost:3000/room/${url}`);
    };

    const renderAvailableSlots = () => {
        const availableSlots = userLimit - users.length;

        const content = Array(availableSlots)
            .fill(0)
            .map((i, index) => {
                return (
                    <Avatar
                        backgroundColor={'white'}
                        borderType="dashed"
                        key={index}
                    ></Avatar>
                );
            });
        return content;
    };
    return (
        <RoomWrapper>
            <Header>
                <div className="left">
                    <div className="room-info">
                        <div>
                            <h3>{language}</h3>
                            <p>{level}</p>
                        </div>
                        <h3 className="topic">{topic}</h3>
                    </div>
                </div>

                <div className="right">
                    <SettingOutlined />
                </div>
            </Header>
            <UserList>
                {users.map((user, id) => (
                    <Avatar
                        backgroundColor={Utils.generateRandomColor()}
                        borderType="none"
                        key={id}
                    >
                        {Utils.generateNameLetter(user.fullname)}
                    </Avatar>
                ))}
                {renderAvailableSlots()}
            </UserList>
            <StyledButton
                onClick={handleJoinRoom}
                color={!myProfile ? '#ccc' : 'rgb(47, 148, 233)'}
            >
                {!myProfile ? <StopOutlined /> : <PhoneOutlined />}
                <span> Join and talk now!</span>
            </StyledButton>
        </RoomWrapper>
    );
};

export default RoomItem;
