import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import DefaultLayout from 'Layouts/DefaultLayout/DefaultLayout';
import styled from 'styled-components';
import ChatBar from 'Components/Room/ChatBar/ChatBar';
import { useSocketContext } from '@libs/Socket';
import { useRouter } from 'next/router';

function RoomTemplate() {
    const Router = useRouter();
    const roomID = Router.query.id;
    const { SocketEmitEvents, SocketState } = useSocketContext();
    const users = SocketState.users;
    useEffect(()=> {
        if(!roomID) return;
        SocketEmitEvents.handleJoinRoom(roomID, 'user_test')
    }, [roomID]);

    return (
        <>
            <Head>
                <title>EngTalkforDev</title>
                <meta name="description" content="English talk for developer" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DefaultLayout>
                <RoomLayoutWapper>
                    <MainContent>
                        {users.map((user, index) => {
                            return <span key={index}>{user}</span>
                        })}
                    </MainContent>
                    <SideBar>
                        <ChatBar />
                    </SideBar>
                </RoomLayoutWapper>
            </DefaultLayout>
        </>
    );
}

const RoomLayoutWapper = styled.div`
    display: flex;
    width: 100%;
`;

const MainContent = styled.div`
    width: 70%;
`;

const SideBar = styled.div`
    width: 30%;
`;

export default RoomTemplate;
