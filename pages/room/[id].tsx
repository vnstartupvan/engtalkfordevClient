import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import DefaultLayout from 'Layouts/DefaultLayout/DefaultLayout';
import styled from 'styled-components';
import ChatBar from 'Components/Room/ChatBar/ChatBar';
import { useRouter } from 'next/router';
import { getProfile } from '@libs/api/user';
import { updateProfile } from '@libs/redux/reducers/AuthReducer';
import { useAppDispatch, useAppSelector } from 'Hooks/UseReduxStore';
import {
    AudioMutedOutlined,
    AudioOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {
    initiateSocket,
    disconnectSocket,
    refreshRooms,
    createRoom,
    sendJoinRoom,
    sendLeaveRoom,
    receiveJoinRoom,
    newUserConnect,
    sendPeerId,
    onPeerId,
    ReceiveVideo,
    sendVideo,
    userDisconnect,
    removeListeners,
    roomsSignal,
} from '@libs/Socket/room-socket';

import { IRoom } from '@libs/models/room';
import { Avatar, Button } from 'antd';
import { IUserResponse } from '@libs/models/user';
import UsePeer from 'Hooks/UsePeer';
import VideoPlayer from 'Components/Room/VideoPlayer';
function RoomTemplate() {
    const myProfile = useAppSelector((state) => state.auth.myProfile);
    const Router = useRouter();
    const roomID = Router.query.id;
    const [room, setRoom] = useState<IRoom | null>(null);
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState<IUserResponse[]>([]);
    const refVideo = useRef({});
    const refPartnerVideo = useRef({});
    const peer = UsePeer(myProfile);
    const [peerId, setPeerId] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream>();
    const [userStream, setUsersStream] = useState<any>([]);
    // const [stream, setStream] = useState<any>(null);
    //Authentication + handle hydration nextjs
    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const user = await getProfile();
                dispatch(updateProfile(user));
            } catch (error) {}
        };

        if (!myProfile) getMyProfile();
    }, []);

    //Peer
    useEffect(() => {
        if (!peer) return;
        peer.on('open', (id: any) => {
            setPeerId(id);
        });
        //Get my stream
        try {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream: MediaStream) => {
                    setStream(stream);
                });
        } catch (error) {
            console.error(error);
        }
    }, [peer]);

    //Socket
    useEffect(() => {
        if (!myProfile || !roomID || !peerId || !stream) return;

        // initiateSocket();
        sendJoinRoom(roomID, myProfile, peerId);
        receiveJoinRoom((users) => {
            console.log(`a user has conntected: `, users);
            setUsers(users);
        });

        newUserConnect((user) => {
            console.log('new user: ', user);
            const call = peer.call(user.peerId, stream);
            call.on('stream', (peerStream: any) => {
                console.log(peerStream, 'call peerstream');
                setUsersStream([...userStream, peerStream])
            });
        });

        peer.on("call", (call: any) => {
            call.answer(stream);
            call.on("stream", (peerStream: any) => {
                setUsersStream([...userStream, peerStream])
            });
        });
        //Peer's Events

        // function addVideoStream(video, stream) {
        //     video.srcObject = stream;
        // }
        // return () => {
        //     sendLeaveRoom(roomID, myProfile);
        // };

        return () => {
            peer.disconnect();
        }
    }, [myProfile, roomID, peerId]);
    console.log(userStream)
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
                        <div className="action-list">
                            <Button>
                                <AudioMutedOutlined />
                            </Button>
                            <Button>
                                <AudioMutedOutlined />
                            </Button>
                            <Button>
                                <VideoCameraOutlined />
                            </Button>
                        </div>
                        <div className="room-screen">
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
                            {userStream.map((video: MediaStream) => {
                                return <VideoPlayer stream={video}/>
                            })}
                        </div>
                        <div className="user-list">
                            {users.map((user, index) => {
                                return (
                                    <Button
                                        style={{
                                            backgroundColor: '#fde3cf',
                                            color: '#f56a00',
                                            border: '2px solid black',
                                        }}
                                        key={user.fullname}
                                    >
                                        {user.fullname.charAt(0)}
                                    </Button>
                                );
                            })}
                        </div>
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
    display: flex;
    height: 100vh;
    flex-direction: column;
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & > .action-list {
        background: green;
        width: 100%;
        height: 20%;
    }
    & > .room-screen {
        background: pink;
        width: 100%;
        height: 60%;
    }
    & > .user-list {
        background: blue;
        width: 100%;
        height: 20%;
    }
`;

const SideBar = styled.div`
    width: 30%;
    height: 100vh;
`;

export default RoomTemplate;
