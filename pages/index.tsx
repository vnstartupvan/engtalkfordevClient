import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import { Inter } from '@next/font/google';
import DefaultLayout from 'Layouts/DefaultLayout/DefaultLayout';
import Toolbar from 'Components/Toolbar/Toolbar';
import RoomList from 'Components/Rooms/RoomList/RoomList';
import apis from 'apis/apis';
import useSocket from 'Hooks/useSocket';
import { SocketProvider } from 'contexts/Socket';
const inter = Inter({ subsets: ['latin'] });

/* 
Home Template: {
    State: Room list
}
Header
Toolbar
Section Room list : {
    props: room list
}
Footer
*/
export default function Home() {
    const mockRoomListData = [
        {
            topic: 'Best Practice ReactJS',
            users: [
                {
                    name: 'Van',
                    avatarUrl: '',
                    role: 'owner',
                },
                {
                    name: 'John',
                    avatarUrl: '',
                    role: 'user',
                },
                {
                    name: 'Daniel',
                    avatarUrl: '',
                    role: 'user',
                },
            ],
            slot: 4,
        },
        {
            topic: 'Best Practice ReactJS',
            users: [
                {
                    name: 'Van',
                    avatarUrl: '',
                    role: 'owner',
                },
                {
                    name: 'John',
                    avatarUrl: '',
                    role: 'user',
                },
                {
                    name: 'Daniel',
                    avatarUrl: '',
                    role: 'user',
                },
            ],
            slot: 4,
        },
        {
            topic: 'Best Practice ReactJS',
            users: [
                {
                    name: 'Van',
                    avatarUrl: '',
                    role: 'owner',
                },
                {
                    name: 'John',
                    avatarUrl: '',
                    role: 'user',
                },
                {
                    name: 'Daniel',
                    avatarUrl: '',
                    role: 'user',
                },
            ],
            slot: 4,
        },
        {
            topic: 'Best Practice ReactJS',
            users: [
                {
                    name: 'Van',
                    avatarUrl: '',
                    role: 'owner',
                },
                {
                    name: 'John',
                    avatarUrl: '',
                    role: 'user',
                },
                {
                    name: 'Daniel',
                    avatarUrl: '',
                    role: 'user',
                },
            ],
            slot: 4,
        },
    ];
    const [roomList, setroomList] = useState();
    useEffect(() => {
        const fetchRoomList = async () => {
            const roomList = await apis.fetchRoomList();
            setroomList(roomList);
        };
        fetchRoomList();
    }, []);

    return (
        <>
            <Head>
                <title>Welcome to EngTalkForDev</title>
                <meta name="description" content="English talk for developer" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DefaultLayout>
                <SocketProvider>
                    {/* Toolbar */}
                    <Toolbar />
                    <RoomList roomList={mockRoomListData} />
                    {/* Room List -> Room */}
                </SocketProvider>
            </DefaultLayout>
        </>
    );
}
