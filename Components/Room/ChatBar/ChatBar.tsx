import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const { TextArea } = Input;

export default function ChatBar() {
    return (
        <ChatBarWapper>
            <div className="action-list"></div>
            <div className="message-box"></div>
            <div className="chatbox">
                <div className="chatbox__actions"></div>
                <TextArea
                    className="chatbox__input"
                    rows={1}
                    placeholder="send message..."
                />
                <Button>
                    <SendOutlined />
                </Button>
            </div>
        </ChatBarWapper>
    );
}

const ChatBarWapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    height: 100vh;
    flex-direction: column;
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        border-top: none;
    }
    & > .action-list {
        width: 100%;
        height: 20%;
    }
    & > .message-box {
        width: 100%;
        height: 60%;
    }
    & > .chatbox {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
