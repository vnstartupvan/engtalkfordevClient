import { Socket } from 'socket.io-client';
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import useSocket from 'Hooks/useSocket';
import { IUserResponse } from '@libs/models/user';

export interface ISocketContextState {
    socket: Socket | undefined;
    uid: string;
    users: IUserResponse[];
    newRoomSignal: boolean;
}

export const defaultSocketContextState = {
    socket: undefined,
    uid: '',
    users: [],
    newRoomSignal: false,
};

export type TSocketContextAction =
    | 'update_socket'
    | 'update_uid'
    | 'update_users'
    | 'remove_user'
    | 'create_room';

export enum ESocketContextAction {
    UPDATE_SOCKET = 'update_socket',
    UPDATE_UID = 'update_uid',
    UPDATE_USERS = 'update_users',
    REMOVE_USER = 'remove_user',
    CREATE_ROOM = 'create_room',
}

export type TSocketContextPayload = string | String[] | Socket | boolean;

export interface ISocketContextAction {
    type: TSocketContextAction;
    payload: TSocketContextPayload;
}

export const SocketContextReducer = (
    state: ISocketContextState,
    action: ISocketContextAction,
) => {
    console.log(
        `Message received - Action: ${action.type} - Payload: ${action.payload}`,
    );

    switch (action.type) {
        case ESocketContextAction.UPDATE_SOCKET:
            return { ...state, socket: action.payload as Socket };
        case ESocketContextAction.UPDATE_UID:
            return { ...state, uid: action.payload as string };
        case ESocketContextAction.UPDATE_USERS:
            return {
                ...state,
                users: action.payload as any[],
            };
        case ESocketContextAction.REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(
                    (uid) => uid._id !== (action.payload as string),
                ),
            };
        case ESocketContextAction.CREATE_ROOM:
            return { ...state, newRoomSignal: action.payload as boolean };
        default:
            return { ...state };
    }
};

export interface ISocketContextProps {
    SocketState: ISocketContextState;
    SocketDispatch: React.Dispatch<ISocketContextAction>;
    SocketEmitEvents: any;
}

const SocketContext = createContext<ISocketContextProps>({
    SocketState: defaultSocketContextState,
    SocketDispatch: () => {},
    SocketEmitEvents: {},
});

export interface ISockerProviderProps {
    children: React.ReactNode;
}

export const SocketProvider = ({ children }: ISockerProviderProps) => {
    const [SocketState, SocketDispatch] = useReducer(
        SocketContextReducer,
        defaultSocketContextState,
    );

    const uri = 'http://localhost:3001';
    const socket = useSocket(uri, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false,
    });
    useEffect(() => {
        /* Connect to web socket */
        socket.connect();
        /* Save the socket in context */
        SocketDispatch({ type: 'update_socket', payload: socket });
        /* Start event listeners */
        StartListeners();
    }, []);

    const StartListeners = () => {
        /* Listen event new room signal */
        socket.on('new room signal', (data) => {
            console.log('new room signal: ', data);
            SocketDispatch({
                type: ESocketContextAction.CREATE_ROOM,
                payload: true,
            });
        });

        /* Listen event disconnect in a room */
        socket.on('user-disconnect', (user) => {
            console.log(`disconnected user: ${user}`);
            SocketDispatch({
                type: ESocketContextAction.REMOVE_USER,
                payload: user._id,
            });
        });

        /* Listen event new room signal */
        socket.on('join-room', (userId) => {
            console.log('new user has joint: ', userId);
            SocketDispatch({
                type: ESocketContextAction.UPDATE_USERS,
                payload: userId,
            });
        });
        /* Reconnect event */
        socket.io.on('reconnect', (attemp) => {
            console.info('Reconnected on attemp: ' + attemp);
        });

        /* Reconnection attemp */
        socket.io.on('reconnect_attempt', (attemp) => {
            console.info('Reconnection attemp: ' + attemp);
        });

        /* Reconnection error */
        socket.io.on('reconnect_error', (attemp) => {
            console.info('Reconnection error: ' + attemp);
        });
    };

    const afterHandleSignal = () => {
        SocketDispatch({
            type: ESocketContextAction.CREATE_ROOM,
            payload: false,
        });
    };

    const handleJoinRoom = (room: string, user: any) => {
        socket.emit('join-room', room, user);
    };

    const SendCreateRoomSignal = () => {
        console.info('Sending create room singal to server ...');
        socket.emit('create-room', 'sending signal');
    };

    interface ISocketEmitEvnets {
        SendCreateRoomSignal: () => void;
        afterHandleSignal: () => void;
        handleJoinRoom: (room: string, userId: IUserResponse) => void;
    }

    const SocketEmitEvents: ISocketEmitEvnets = {
        SendCreateRoomSignal,
        afterHandleSignal,
        handleJoinRoom,
    };

    return (
        <SocketContext.Provider
            value={{ SocketState, SocketDispatch, SocketEmitEvents }}
        >
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
