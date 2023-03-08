import React, { useEffect } from 'react';
import { Modal } from 'antd';
import FormModal from './FormModal/FormModal';
import { WarningText } from './modal.styled';
import { handleCreateRoom } from 'Components/Toolbar/Toolbar.feature';
export interface IModalProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}
import { useSocketContext } from '@libs/Socket';
import { RoomInfoPayload } from '@libs/models/room';
import {
    initiateSocket,
    testSocket,
    disconnectSocket,
    refreshRooms,
    createRoom,
    sendJoinRoom,
    receiveJoinRoom,
    userDisconnect,
    removeListeners,
    roomsSignal,
} from '@libs/Socket/room-socket';

const ModalComponent = ({
    isModalOpen,
    handleOk,
    handleCancel,
}: IModalProps) => {
    // const { SocketState, SocketDispatch, SocketEmitEvents } =
    //     useSocketContext();

    // console.log(SocketState);
    const handleSubmit = async (values: RoomInfoPayload) => {
        const room = await handleCreateRoom(values);
        createRoom(room);
        // SocketEmitEvents.SendCreateRoomSignal();
    };
    useEffect(() => {
        initiateSocket();
    }, []);
    return (
        <>
            <Modal
                title="Create your room"
                open={isModalOpen}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={handleCancel}
            >
                <WarningText>
                    NOTE: You will get banned if you abuse the Topic (click here
                    for more detail)
                </WarningText>
                <FormModal
                    handleAfterSubmit={handleOk}
                    handleSubmit={handleSubmit}
                />
            </Modal>
        </>
    );
};

export default ModalComponent;
