import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ReceiveMsg, sendMsg } from '@libs/Socket/room-socket';
import { IUserResponse } from '@libs/models/user';

const { TextArea } = Input;

export default function ChatBar({
    room,
    user,
}: {
    room: any;
    user: IUserResponse | null;
}) {
    const [messages, setMessages] = useState<any[]>([]);
    const chatInputRef = useRef<any>();

    const handleSendMsg = (room: any, user: any) => {
        const msg = chatInputRef.current?.resizableTextArea?.textArea.value;
        if (!user || !msg) return;

        const newMsg = {
            userName: user.fullname,
            msg,
        };

        setMessages([...messages, newMsg]);
        sendMsg(room, user, msg);
    };

    useEffect(() => {
        const handleReceiveMsg = (user: IUserResponse, msg: string) => {
            const newMsg = {
                userName: user.fullname,
                msg,
            };

            setMessages([...messages, newMsg]);
        };

        ReceiveMsg(handleReceiveMsg);
    }, []);
    console.log(messages);
    const renderMsgs = () => {
        if (messages.length <= 0) return;
        return messages.map((m, index) => {
            return (
                <div key={index}>
                    <p>
                        {m.userName}: {m.msg}
                    </p>
                </div>
            );
        });
    };

    return (
        <ChatBarWapper>
            <div className="action-list"></div>
            <div className="message-box">{renderMsgs()}</div>
            <div className="chatbox">
                <div className="chatbox__actions"></div>
                <TextArea
                    ref={chatInputRef}
                    className="chatbox__input"
                    rows={1}
                    placeholder="send message..."
                />
                <Button onClick={() => handleSendMsg(room, user)}>
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
