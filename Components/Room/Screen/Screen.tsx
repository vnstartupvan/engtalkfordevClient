import { Avatar, Button } from 'antd';
import VideoPlayer from 'Components/Room/VideoPlayer';
import styled from 'styled-components';

export interface IScreenProps {
    stream: MediaStream | undefined;
    userStream: any[];
}
function Screen({ stream, userStream }: IScreenProps) {
    return (
        <StyledScreen>
            <Avatar
                size={200}
                style={{
                    backgroundColor: '#fde3cf',
                    color: '#f56a00',
                    border: '2px solid black',
                }}
            >
                <p style={{ fontSize: '120px' }}>V</p>
            </Avatar>
            <VideoPlayer stream={stream} />
            {userStream.map((video: MediaStream, index) => {
                return <VideoPlayer key={index} stream={video} />;
            })}
        </StyledScreen>
    );
}

const StyledScreen = styled.div`
    background: pink;
    width: 100%;
    height: 60%;
`;

export default Screen;
