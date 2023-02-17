import React from "react";
import Menu from "./Menu";
import AppLogo from "Components/Commons/AppLogo";
import { Header, WelcomeText, MainContent, ActionList, UserIcon } from './Header.styled'
function HeaderComponent() {
    return (
        <Header>
            <AppLogo />
            <MainContent>
                <WelcomeText>Welcome to English Talk For Developer</WelcomeText>
                <div>
                    <Menu />
                    <ActionList>
                        <UserIcon>
                            <i className="fa fa-user"></i>
                        </UserIcon>
                    </ActionList>
                </div>
            </MainContent>
        </Header>
    );
}



export default HeaderComponent;
