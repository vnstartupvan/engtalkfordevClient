import { Tooltip, Button } from 'antd';
import {
    AudioMutedOutlined,
    AudioOutlined,
    DesktopOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

function ActionList() {
    return (
        <StyledActionList>
            <Tooltip placement="bottom" title="Turn on your microphone">
                <Button>
                    <AudioMutedOutlined />
                </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="Share your screen">
                <Button>
                    <DesktopOutlined />
                </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="Turn on your webcam">
                <Button>
                    <DesktopOutlined />
                </Button>
            </Tooltip>
        </StyledActionList>
    );
}

const StyledActionList = styled.div`
    background: green;
    width: 100%;
    height: 20%;
`;

export default ActionList;
