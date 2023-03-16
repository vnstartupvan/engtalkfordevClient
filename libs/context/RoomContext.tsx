import { getProfile } from '@libs/api/user';
import { IUserResponse } from '@libs/models/user';
import { updateProfile } from '@libs/redux/reducers/AuthReducer';
import {
    newUserConnect,
    receiveJoinRoom,
    sendJoinRoom,
    userDisconnect,
    sendCamera,
    ReceiveVideo,
} from '@libs/Socket/room-socket';
import UsePeer from 'Hooks/UsePeer';
import { useAppDispatch, useAppSelector } from 'Hooks/UseReduxStore';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

export interface IRoomContext {
    stream: MediaStream | undefined;
    userStream: any;
    users: IUserResponse[];
    handleOpenCamera: Function;
    handleOpenStream: any;
}
const defaultContext = {
    stream: undefined,
    userStream: [],
    users: [],
    handleOpenCamera: () => {},
    handleOpenStream: () => {},
};
const RoomContext = createContext<IRoomContext>(defaultContext);

export interface IRoomProvider {
    children: React.ReactNode;
}
export const RoomProvider = ({ children }: IRoomProvider) => {
    const myProfile = useAppSelector((state) => state.auth.myProfile);
    const dispatch = useAppDispatch();
    const Router = useRouter();
    const peer = UsePeer(myProfile);
    const roomID = Router.query.id;
    const [users, setUsers] = useState<IUserResponse[]>([]);
    const [peerId, setPeerId] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream>();
    const [userStream, setUsersStream] = useState<any>([]);
    const [otherU, setOtherU] = useState<any>();

    const [onVideo, setOnVideo] = useState<boolean>(false);

    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const user = await getProfile();
                dispatch(updateProfile(user));
            } catch (error) {}
        };

        if (!myProfile) getMyProfile();
    }, []);

    // Peer;
    useEffect(() => {
        if (!peer) return;
        peer.on('open', (id: any) => {
            setPeerId(id);
        });
    }, [peer]);

    // Socket;
    useEffect(() => {
        if (!myProfile || !roomID || !peerId) return;

        sendJoinRoom(roomID, myProfile, peerId);
        receiveJoinRoom((users) => {
            console.log(`a user has conntected: `, users);
            setUsers(users);
        });

        newUserConnect((user) => {
            console.log('new user: ', user);
            setOtherU(user);
        });

        peer.on('call', (call: any) => {
            call.answer(stream);
            call.on('stream', (peerStream: any) => {
                setUsersStream([...userStream, peerStream]);
            });
        });

        userDisconnect((data) => {
            console.log('user disconnected: ', data);
            const updatedUsersStream = userStream.filter(
                (i: string) => i !== data.peerId,
            );
            setUsersStream(updatedUsersStream);
        });

        return () => {
            peer.disconnect();
        };
    }, [myProfile, roomID, peerId]);
    console.log('userStreasdasdas',userStream);
    const handleOpenCamera = () => {
        if (!onVideo)
            try {
                navigator.mediaDevices
                    .getUserMedia({ video: true, audio: true })
                    .then((stream: MediaStream) => {
                        // setUsersStream([...userStream, stream]);
                        if (otherU) {
                            const call = peer.call(otherU.peerId, stream);
                            setOnVideo(true);
                            call.on('stream', (peerStream: any) => {
                                console.log(peerStream, 'call peerstream');
                            });
                        }
                    });
            } catch (error) {
                console.error(error);
            }
    };

    const handleOpenStream = (peerId: any) => {
        const clickStream = userStream.find((i: any) => i.peerId == peerId);

        console.log(clickStream);
    };

    const handleOpenMic = () => {
        //Emit user to socket
    };

    const values = {
        stream,
        userStream,
        users,
        handleOpenCamera,
        handleOpenStream,
    };

    return (
        <RoomContext.Provider value={values}>{children}</RoomContext.Provider>
    );
};

export const useRoomContext = () => {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error('UseSocketContext must be used in Socket Provider!');
    }

    return context;
};
