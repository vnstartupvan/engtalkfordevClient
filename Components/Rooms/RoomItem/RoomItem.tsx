import { IRoom } from '@libs/models/room';
import { useSelector } from 'react-redux';
import { RoomWrapper, Header, UserList, StyledButton, Avatar } from './styled';
import { RootState } from 'libs/redux/store';
import {
    SettingOutlined,
    PhoneOutlined,
    StopOutlined,
} from '@ant-design/icons';
import { Utils } from '@utils/common/Utils';
import { message, Tooltip } from 'antd';
import Settings from 'components/Rooms/RoomItem/Setting';

export interface IComponentProps {
    room: IRoom;
}

const RoomItem: React.FC<IComponentProps> = ({ room }) => {
    const myProfile = useSelector((state: RootState) => state.auth.myProfile);
    const { topic, users, url, language, level, userLimit } = room;
    const available = users.length >= userLimit ? true : false;
    const [messageApi, contextHolder] = message.useMessage();

    const handleJoinRoom = () => {
        if (!myProfile) {
            messageApi.info('Please log in to join our community!');
            return;
        }

        window.open(`http://localhost:3000/room/${url}`);
    };

    const renderAvailableSlots = () => {
        const availableSlots =
            userLimit - users.length > 0 ? userLimit - users.length : 0;

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
                    <Tooltip placement="bottom" title={<Settings />}>
                        <SettingOutlined />
                    </Tooltip>
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
                disabled={available}
                color={!myProfile || available ? '#ccc' : 'rgb(47, 148, 233)'}
            >
                {contextHolder}
                {!myProfile ? <StopOutlined /> : <PhoneOutlined />}
                <span>
                    {available ? 'This room is full' : 'Join and talk now!'}
                </span>
            </StyledButton>
        </RoomWrapper>
    );
};

export default RoomItem;
