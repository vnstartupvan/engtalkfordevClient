import env from 'constants/env';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client';

let ws: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
export const initiateSocket = (conversationId: string) => {
    ws = io(env.apiUrl || '', {
        transports: ['websocket'],
        query: { conversationId },
    });
};

export const disconnectSocket = () => {
    if (ws) ws.disconnect();
};

export const subscribeToChat = (cb: any) => {
    if (ws) ws.on('chat', cb);
};

export const sendMessage = (message: any) => {
    if (ws) ws.emit('chat', { message });
};

export const subscribeToUserTypingStatus = (cb: any) => {
    if (ws) ws.on('userTyping', cb);
};

export const userTyping = (status: any) => {
    if (ws) ws.emit('userTyping', status);
};

const chatSocket = {
    ws,
    initiateSocket,
    disconnectSocket,
    subscribeToChat,
    sendMessage,
    subscribeToUserTypingStatus,
    userTyping,
};

export default chatSocket;
