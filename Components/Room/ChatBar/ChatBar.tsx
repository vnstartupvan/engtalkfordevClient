import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ReceiveMsg, sendMsg, joinChat } from '@libs/Socket/room-socket';
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
        if (!room) return;
        joinChat(room);
    }, [room]);

    useEffect(() => {
        if (!room) return;
        const handleReceiveMsg = (user: IUserResponse, msg: string) => {
            const newMsg = {
                userName: user.fullname,
                msg,
            };
            console.log('receive msg');
            console.log(messages);
            setMessages([...messages, newMsg]);
        };

        ReceiveMsg(handleReceiveMsg);
    }, [room, messages]);

    const renderMsgs = () => {
        if (messages.length <= 0) return;
        return messages.map((m, index) => {
            return (
                <div key={index}>
                    <p style={{ paddingBottom: '5px' }}>
                        {m.userName}: {m.msg}
                    </p>
                </div>
            );
        });
    };

    return (
        <ChatBarWapper>
            <div className="message-box">{renderMsgs()}</div>
            <div className="chatbox">
                <div className="chatbox-wrapper">
                    <TextArea
                        ref={chatInputRef}
                        className="chatbox__input"
                        rows={1}
                        placeholder="send message..."
                    />
                    <Button
                        style={{
                            height: '100%',
                            borderRadius: 0,
                            borderTopRightRadius: '5px',
                            borderBottomRightRadius: '5px',
                        }}
                        onClick={() => handleSendMsg(room, user)}
                    >
                        <SendOutlined />
                    </Button>
                </div>
            </div>
        </ChatBarWapper>
    );
}

const ChatBarWapper = styled.div`
    height: 100%;
    padding: 0 5px;
    & .message-box {
        height: 80%;
        font-size: 19px;
        overflow-y: scroll;
        padding: 15px;
        background: #fff;
        margin-bottom: 5px;
        border-radius: 5px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
            rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    & .chatbox {
        height: 20%;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
            rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        & .chatbox-wrapper {
            display: flex;
            align-items: stretch;
            height: 100%;
        }
        & textarea {
            border-radius: 0;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }
        && button {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }
`;
