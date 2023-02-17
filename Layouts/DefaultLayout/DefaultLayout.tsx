import Footer from 'Components/Layouts/Footer/Footer';
import Header from 'Components/Layouts/Header/Header';
import React from 'react';
import styled from "styled-components";

export interface PropsType {
    children: React.ReactNode;
};

function DefaultLayout({ children }: PropsType) {
    return (
        <LayoutWrapper>
            <Header></Header>
            <Template>
                {children}
            </Template>
            <Footer></Footer>
        </LayoutWrapper>
    )
}
const LayoutWrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
`;
const Template = styled.main`
    min-height: calc(100vh - 30px);
`;
export default DefaultLayout;