// import { ESocketContextAction } from './index';
import { IUserResponse } from './../models/user';
import env from 'constants/env';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client';

let ws: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
export const initiateSocket = () => {
    ws = io('https://engtalkfordevserver.onrender.com');
    // ws = io('http://localhost:3001');
        // ws = io(env.apiUrl || '');
};

export const disconnectSocket = () => {
    if (ws) ws.disconnect();
};

export const roomsSignal = (cb: any): any => {
    if (ws)
        ws.on('rooms-signal', (data) => {
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

export const sendCamera = (room: any, user: any) => {
    if (ws) ws.emit('user-send-video', room, user);
};

export const sendLeaveRoom = (room: any, user: IUserResponse) => {
    if (ws) ws.emit('leave-room', room, user);
};

export const sendVideo = (room: any, stream: any) => {
    if (ws) ws.emit('client-send-video', room, stream);
};

export const ReceiveVideo = (cb: (user: any) => void) => {
    if (ws) ws.on('receive-new-video', cb);
};

export const receiveJoinRoom = (cb: (users: IUserResponse[]) => void) => {
    if (ws) ws.on('joint-room', cb);
};

export const sendPeerId = (
    user: IUserResponse,
    room: any,
    mediaID: string,
): void => {
    if (ws) ws.emit('send-peerId', room, user._id, mediaID);
};

export const onPeerId = (cb: (id: string) => void): void => {
    if (ws) ws.on('peerId', cb);
};

export const receiveNewPeers = (cb: (peers: { userId: string }[]) => void) => {
    if (ws) ws.on('newPeers', cb);
};

export const newUserConnect = (cb: (user: IUserResponse) => void) => {
    if (ws) ws.on('new-user-connect', cb);
};

export const userDisconnect = (cb: (data: any) => void) => {
    if (ws) ws.on('user-disconnect', cb);
};

export const removeListeners = (events: Array<any>) => {
    if (ws)
        events.forEach((event) => {
            if (ws) ws.removeAllListeners(event);
        });
};

export const joinChat = (room: any) => {
    if (ws) ws.emit('join-chat', room);
};

export const sendMsg = (room: any, user: any, msg: string) => {
    if (ws) ws.emit('send-msg', room, user, msg);
};

export const ReceiveMsg = (cb: (user: any, msg: string) => void) => {
    if (ws) ws.on('receive-msg', cb);
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
