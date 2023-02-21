import React from 'react';
import { Modal } from 'antd';
import FormModal from './FormModal/FormModal';
import { WarningText } from './modal.styled';
import { handleCreateRoom } from 'Components/Toolbar/Toolbar.feature';
export interface IModalProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}
import { APIPRoomProps } from 'apis/roomServices/room.service';
import { useSocketContext } from 'contexts/Socket';

const ModalComponent = ({
    isModalOpen,
    handleOk,
    handleCancel,
}: IModalProps) => {
    const { SocketState, SocketDispatch, SocketEmitEvents } =
        useSocketContext();

    console.log(SocketState);
    const handleSubmit = async (values: APIPRoomProps) => {
        const room = values;
        await handleCreateRoom(room);
        SocketEmitEvents.SendCreateRoomSignal();
    };
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
