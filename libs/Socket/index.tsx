import { createContext, useContext, useEffect } from 'react';
import env from 'constants/env';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client';
import { IUserResponse } from './../models/user';

export const SocketContext = createContext<any>({});

export interface ISocketProvider {
    children: React.ReactNode;
}
export const SocketProvider = ({ children }: ISocketProvider) => {
    let ws: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

    useEffect(() => {
        const initiateSocket = () => {
            ws = io(env.apiUrl || '');
        };

        initiateSocket();
    }, []);
    const roomsSignal = (cb: any): any => {
        if (ws)
            ws.on('rooms-signal', (data) => {
                console.log(ws, 'signal');
                console.log('signal: ', data);
                cb(data);
            });
    };

    const createRoom = (data: any) => {
        if (ws) ws.emit('create-room', data);
    };

    const sendJoinRoom = (room: any, user: IUserResponse) => {
        if (ws) ws.emit('join-room', room, user);
    };

    const receiveJoinRoom = (cb: (users: IUserResponse[]) => void) => {
        console.log(123);
        if (ws) ws.on('joint-room', cb);
    };

    const removeListeners = (events: Array<any>) => {
        if (ws)
            events.forEach((event) => {
                if (ws) ws.removeAllListeners(event);
            });
    };
    const SocketEvents = {
        roomsSignal,
        createRoom,
        sendJoinRoom,
        receiveJoinRoom,
        removeListeners,
    };

    return (
        <SocketContext.Provider value={SocketEvents}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error('UseSocketContext must be used in Socket Provider!');
    }

    return context;
};
