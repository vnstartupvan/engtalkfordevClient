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
import { RoomInfoPayload } from '@libs/models/room';
import { createRoom } from '@libs/Socket/room-socket';

const ModalComponent = ({
    isModalOpen,
    handleOk,
    handleCancel,
}: IModalProps) => {
    const handleSubmit = async (values: RoomInfoPayload) => {
        const room = await handleCreateRoom(values);
        createRoom(room);
    };
    return (
        <>
            <Modal
                title="Create your room"
                open={isModalOpen}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
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
