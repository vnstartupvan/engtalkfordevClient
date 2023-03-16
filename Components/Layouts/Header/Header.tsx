import React from 'react';
import Menu from './Menu';
import AppLogo from 'Components/Commons/AppLogo';
import { Header, WelcomeText, MainContent } from './Header.styled';
import ActionList from './ActionList/ActionList';

function HeaderComponent() {
    return (
        <Header>
            <AppLogo />
            <MainContent>
                <WelcomeText>Welcome to English Talk For Developer</WelcomeText>
                <div>
                    <Menu />
                    <ActionList />
                </div>
            </MainContent>
        </Header>
    );
}

export default HeaderComponent;
