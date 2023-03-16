import React, { useEffect } from 'react';
import { Button, Space } from 'antd';
import ModalComponent from 'Components/Commons/Modal';
import { useState } from 'react';
import {
    ToolbarWrapper,
    CreateRoom,
    BuyCoffee,
    Policy,
    JoinFb,
    BtnText,
} from './styled';

function Toolbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <ToolbarWrapper>
            <CreateRoom>
                <Space>
                    <Button type="primary" onClick={() => showModal()}>
                        <i className="fa fa-plus"></i>
                        <BtnText>Create your room</BtnText>
                    </Button>
                </Space>
            </CreateRoom>
            <BuyCoffee>
                <Space>
                    <Button type="primary">
                        <i className="fa fa-mug-hot"></i>
                        <BtnText>Buy me a coffee</BtnText>
                    </Button>
                </Space>
            </BuyCoffee>
            <Policy>
                <Space>
                    <Button type="primary">
                        <i className="fa fa-balance-scale"></i>
                        <BtnText>Policy</BtnText>
                    </Button>
                </Space>
            </Policy>
            <JoinFb>
                <Space>
                    <Button type="primary">
                        <i className="fab fa-facebook-square"></i>
                        <BtnText>
                            <a
                                href="https://www.facebook.com/groups/510649920919412"
                                target="_blank"
                            >
                                Join our community
                            </a>
                        </BtnText>
                    </Button>
                </Space>
            </JoinFb>
            <ModalComponent
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </ToolbarWrapper>
    );
}

export default Toolbar;
