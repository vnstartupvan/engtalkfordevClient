import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import DefaultLayout from 'Layouts/DefaultLayout/DefaultLayout';
import styled from 'styled-components';
import ChatBar from 'Components/Room/ChatBar/ChatBar';
import { useSocketContext } from '@libs/Socket';
import { useRouter } from 'next/router';
import { getProfile } from '@libs/api/user';
import { updateProfile } from '@libs/redux/reducers/AuthReducer';
import { useAppDispatch, useAppSelector } from 'Hooks/UseReduxStore';
import { IUserResponse } from '@libs/models/user';

import {
    initiateSocket,
    disconnectSocket,
    testSocket,
    refreshRooms,
    createRoom,
    joinRoom,
    userDisconnect,
    removeListeners,
} from '@libs/Socket/room-socket';

function RoomTemplate() {
    const myProfile = useAppSelector((state) => state.auth.myProfile);
    const Router = useRouter();
    const roomID = Router.query.id;
    const { SocketEmitEvents, SocketState } = useSocketContext();
    // const users = SocketState.users;
    // console.log(users);
    const dispatch = useAppDispatch();

    const [users, setUsers] = useState<IUserResponse[]>([]);

    useEffect(() => {
        initiateSocket()
        testSocket('test socket')
        // const getMyProfile = async () => {
        //     try {
        //         const user = await getProfile();
        //         console.log(user);
        //         dispatch(updateProfile(user));
        //     } catch (error) {}
        // };
        // if (!myProfile) getMyProfile();
    }, []);

    // useEffect(() => {
    //     if (!myProfile) return;
    // }, [myProfile]);

    // useEffect(() => {
    //     if (!roomID || !myProfile) return;

    //     if (!myProfile) {
    //         alert('Please Log in to join our community!');
    //         Router.push('http://localhost:3000');
    //     }

    //     console.log(myProfile);
    //     SocketEmitEvents.handleJoinRoom(roomID, myProfile);
    // }, [roomID, myProfile]);

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
                            return <span key={index}>{user.fullname}</span>;
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
