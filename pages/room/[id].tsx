import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import DefaultLayout from 'Layouts/DefaultLayout/DefaultLayout';
import styled from 'styled-components';
import ChatBar from 'Components/Room/ChatBar/ChatBar';
import { useRouter } from 'next/router';
import { getProfile } from '@libs/api/user';
import { updateProfile } from '@libs/redux/reducers/AuthReducer';
import { useAppDispatch, useAppSelector } from 'Hooks/UseReduxStore';
import {
    sendJoinRoom,
    receiveJoinRoom,
    newUserConnect,
    userDisconnect,
    receiveNewPeers,
} from '@libs/Socket/room-socket';

import { IUserResponse } from '@libs/models/user';
import UsePeer from 'Hooks/UsePeer';
import UserList from 'Components/Room/User/UserList';
import Screen from 'Components/Room/Screen/Screen';
import ActionList from 'Components/Room/ActionList';

function RoomTemplate() {
    const myProfile = useAppSelector((state) => state.auth.myProfile);
    const dispatch = useAppDispatch();
    const Router = useRouter();
    const peer = UsePeer(myProfile);

    const roomID = Router.query.id;
    const [users, setUsers] = useState<IUserResponse[]>([]);
    const [peerId, setPeerId] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream>();
    const [activeStream, setActiveStream] = useState<MediaStream>();
    const [userStream, setUsersStream] = useState<any>([]);

    useEffect(() => {
        if (!roomID) return;
        const getMyProfile = async () => {
            try {
                const user: IUserResponse = await getProfile();
                dispatch(updateProfile(user));
                //Get my stream
                try {
                    navigator.mediaDevices
                        .getUserMedia({ video: true, audio: true })
                        .then((stream: MediaStream) => {
                            setUsers([
                                ...users,
                                { ...user, mediaStream: stream },
                            ]);
                            setStream(stream);
                        });
                } catch (error) {
                    console.error(error);
                }
            } catch (error) {}
        };

        if (!myProfile) getMyProfile();
    }, [roomID]);

    //Peer
    useEffect(() => {
        if (!peer) return;
        peer.on('open', (id: any) => {
            setPeerId(id);
        });
    }, [peer]);

    //Socket
    useEffect(() => {
        if (!myProfile || !roomID || !peerId || !stream) return;

        sendJoinRoom(roomID, myProfile, peerId);
        receiveJoinRoom((users) => {
            setUsers(users);
        });

        newUserConnect((user) => {
            const call = peer.call(user.peerId, stream);
            call.on('stream', (peerStream: any) => {
                setUsers([...users, { ...user, mediaStream: peerStream }]);
                setUsersStream([...userStream, peerStream]);
            });
        });

        peer.on('call', (call: any) => {
            call.answer(stream);
            call.on('stream', (peerStream: any) => {
                setUsersStream([...userStream, peerStream]);
            });
        });

        userDisconnect((data) => {
            const updatedUsersStream = userStream.filter(
                (i: string) => i !== data.peerId,
            );
            setUsersStream(updatedUsersStream);
        });

        return () => {
            peer.disconnect();
        };
    }, [myProfile, roomID, peerId]);

    const handleWatchVideo = (stream: MediaStream) => {
        if (activeStream) {
            setActiveStream(undefined);
            return;
        }
        setActiveStream(stream);
    };
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
                        <ActionList />
                        <Screen
                            stream={stream}
                            userStream={userStream}
                            activeScreen={activeStream}
                        />
                        <UserList users={users} cb={handleWatchVideo} />
                    </MainContent>
                    <SideBar>
                        <ChatBar room={roomID} user={myProfile} />
                    </SideBar>
                </RoomLayoutWapper>
            </DefaultLayout>
        </>
    );
}

const RoomLayoutWapper = styled.div`
    display: flex;
    width: 100%;
    background: linear-gradient(to left,#ff99ff 0%,#0066cc 100%);
    padding: 15px 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const MainContent = styled.div`
    width: 70%;
    display: flex;
    height: 100vh;
    flex-direction: column;
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const SideBar = styled.div`
    width: 30%;
    height: 100vh;

`;

export default RoomTemplate;
