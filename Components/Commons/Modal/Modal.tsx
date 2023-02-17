import React from 'react'
import {Modal} from 'antd'
import FormModal from './FormModal/FormModal'
import {WarningText} from './modal.styled'
import {handleCreateRoom} from 'Components/Toolbar/Toolbar.feature'
export interface IModalProps {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
}
import { APIPRoomProps } from 'apis/roomServices/room.service'

const ModalComponent = ({isModalOpen, handleOk, handleCancel}: IModalProps) => {
    const handleSubmit = (values: APIPRoomProps) => {
        const room = values;
        console.log(room);
        
        handleCreateRoom(room)
    }
    return (
        <>
            <Modal
                title="Create your room"
                open={isModalOpen}
                okButtonProps={{style: {display: 'none'}}}
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
    )
}

export default ModalComponent
