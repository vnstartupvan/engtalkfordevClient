import React, { useState } from 'react';
import Menu from './Menu';
import AppLogo from 'Components/Commons/AppLogo';
import {
    Header,
    WelcomeText,
    MainContent,
    ActionList,
    UserIcon,
} from './Header.styled';
import ModalAuth from 'Components/ModalAuth';

function HeaderComponent() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <Header>
            <AppLogo />
            <MainContent>
                <WelcomeText>Welcome to English Talk For Developer</WelcomeText>
                <div>
                    <Menu />
                    <ActionList>
                        <UserIcon onClick={showModal}>
                            <i className="fa fa-user"></i>
                        </UserIcon>
                    </ActionList>
                </div>
            </MainContent>
            <ModalAuth
                title="Login"
                isOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={showModal}
            />
        </Header>
    );
}

export default HeaderComponent;
