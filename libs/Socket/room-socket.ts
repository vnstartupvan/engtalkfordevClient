// import { ESocketContextAction } from './index';
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

export const roomsSignal = (cb: any): any => {
    if (ws)
        ws.on('rooms-signal', (data) => {
            console.log(ws, 'signal');
            console.log('signal: ', data);
            cb(data);
        });
};

export const refreshRooms = (cb: (data: any) => void) => {
    if (ws) ws.on('refreshRoom', cb);
};

export const createRoom = (data: any) => {
    if (ws) ws.emit('create-room', data);
};

export const sendJoinRoom = (
    room: any,
    user: IUserResponse,
    peerId: string,
) => {
    if (ws) ws.emit('join-room', room, user, peerId);
};

export const sendLeaveRoom = (room: any, user: IUserResponse) => {
    if (ws) ws.emit('leave-room', room, user);
};

export const sendVideo = (room: any, stream: any) => {
    // console.log(stream, room);
    if (ws) ws.emit('client-send-video', room, stream);
};

export const ReceiveVideo = (cb: (stream: any) => void) => {
    if (ws) ws.on('server-send-video', cb);
};

export const receiveJoinRoom = (cb: (users: IUserResponse[]) => void) => {
    // console.log(123, ws);
    if (ws) ws.on('joint-room', cb);
};

export const sendPeerId = (peerId: string): void => {
    if (ws) ws.emit('send-peerId', peerId);
};

export const onPeerId = (cb: (id: string) => void): void => {
    if (ws) ws.on('peerId', cb);
};

export const newUserConnect = (cb: (user: IUserResponse) => void) => {
    if(ws) ws.on('new-user-connect', cb)
}

export const userDisconnect = (cb: (data: any) => void) => {
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
    disconnectSocket,
    refreshRooms,
    createRoom,
    sendJoinRoom,
    userDisconnect,
    removeListeners,
};

export default roomSocket;
