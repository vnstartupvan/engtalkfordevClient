import { Avatar, Button } from 'antd';
import VideoPlayer from 'Components/Room/VideoPlayer';
import styled from 'styled-components';

export interface IScreenProps {
    stream: MediaStream | undefined;
    userStream: any[];
    activeScreen: MediaStream | undefined;
}
function Screen({ stream, userStream, activeScreen }: IScreenProps) {
    return (
        <StyledScreen>
            {activeScreen ? (
                <VideoPlayer stream={activeScreen} />
            ) : (
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
            )}
            {/* {userStream.map((video: MediaStream, index) => {
                return <VideoPlayer key={index} stream={video} />;
            })} */}
        </StyledScreen>
    );
}

const StyledScreen = styled.div`
    width: 100%;
    height: 60%;
    overflow: hidden;
`;

export default Screen;
