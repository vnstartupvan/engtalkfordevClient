import { Socket } from 'socket.io-client';
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import useSocket from 'Hooks/useSocket';

export interface ISocketContextState {
    socket: Socket | undefined;
    uid: string;
    users: string[];
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
            return { ...state, users: action.payload as string[] };
        case ESocketContextAction.REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(
                    (uid) => uid !== (action.payload as string),
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
    const [loading, setLoading] = useState<boolean>(false);
    const [SocketState, SocketDispatch] = useReducer(
        SocketContextReducer,
        defaultSocketContextState,
    );

    const uri = 'http://localhost:3001';
    const socket = useSocket(uri);
    useEffect(() => {
        /* Connect to web socket */
        socket.connect();
        /* Save the socket in context */
        SocketDispatch({ type: 'update_socket', payload: socket });
        /* Start event listeners */
        StartListeners();
    }, []);

    const StartListeners = () => {
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

        /* Listen event new room signal */
        socket.on('newRoomSignal', (data) => {
            console.log('new room signal: ', data);
            SocketDispatch({
                type: ESocketContextAction.CREATE_ROOM,
                payload: true,
            });
        });
    };

    const afterHandleSignal = () => {
        SocketDispatch({
            type: ESocketContextAction.CREATE_ROOM,
            payload: false,
        });
    };

    const SendCreateRoomSignal = () => {
        console.info('Sending create room singal to server ...');
        socket.emit('create-room', 'sending signal');
    };

    const SocketEmitEvents = {
        SendCreateRoomSignal,
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
