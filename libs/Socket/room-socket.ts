import { ESocketContextAction } from './index';
import { IUserResponse } from './../models/user';
import env from 'constants/env';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client';

let ws: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
export const initiateSocket = () => {
    ws = io(env.apiUrl || '');
};
export const disconnectSocket = () => {
    if (ws) ws.disconnect();
};

export const testSocket = (data: any) => {
    if (ws) ws.emit('testSocket', data);
};

export const refreshRooms = (cb: (data: any) => void) => {
    if (ws) ws.on('refreshRoom', cb);
};

export const createRoom = (data: any) => {
    if (ws) ws.emit('createRoom', data);
};

export const joinRoom = (room: string, user: IUserResponse) => {
    if (ws) ws.emit('join-room', room, user);
};

export const userDisconnect = (
    cb: (user: IUserResponse, type: ESocketContextAction) => void,
) => {
    if (ws) ws.on('user-disconnect', cb);
};

export const removeListeners = (events: Array<any>) => {
    if (ws)
        events.forEach((event) => {
            if (ws) ws.removeAllListeners(event);
        });
};

const roomSocket = {
    ws,
    testSocket,
    disconnectSocket,
    refreshRooms,
    createRoom,
    joinRoom,
    userDisconnect,
    removeListeners,
};

export default roomSocket;
