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
import { useSelector } from 'react-redux';
import { RootState } from '@libs/redux/store';

function HeaderComponent() {
    const myProfile = useSelector((state: RootState) => state.auth.myProfile);

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
        <Header>
            <AppLogo />
            <MainContent>
                <WelcomeText>Welcome to English Talk For Developer</WelcomeText>
                <div>
                    <Menu />
                    <ActionList>
                        {!myProfile ? (
                            <UserIcon onClick={showModal}>
                                <i className="fa fa-user"></i>
                            </UserIcon>
                        ) : (
                            <UserIcon>
                                <i className="fa fa-user"></i>
                                <br />
                                {`Hi ${myProfile.fullname} !`}
                            </UserIcon>
                        )}
                    </ActionList>
                </div>
            </MainContent>
            <ModalAuth
                isOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </Header>
    );
}

export default HeaderComponent;
