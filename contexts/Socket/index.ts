import { Socket } from 'socket.io-client';
import { createContext } from 'react';

export interface ISocketContextState {
    socket: Socket | undefined;
    uid: string;
    users: string[];
}

export const defaultSocketContextState = {
    socket: undefined,
    uid: '',
    users: [],
};

export type TSocketContextAction =
    | 'update_socket'
    | 'update_uid'
    | 'update_users'
    | 'remove_user';

export enum ESocketContextAction {
    UPDATE_SOCKET = 'update_socket',
    UPDATE_UID = 'update_uid',
    UPDATE_USERS = 'update_users',
    REMOVE_USER = 'remove_user',
}

export type TSocketContextPayload = string | String[] | Socket;

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
        default:
            return { ...state };
    }
};

export interface ISocketContextProps {
    SocketState: ISocketContextState;
    SocketDispatch: React.Dispatch<ISocketContextAction>;
}

const SocketContext = createContext<ISocketContextProps>({
    SocketState: defaultSocketContextState,
    SocketDispatch: () => {},
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketCOntextProvider = SocketContext.Provider;
