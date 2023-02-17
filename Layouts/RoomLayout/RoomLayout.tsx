import React from 'react'
import styled from 'styled-components'
export interface IRoomLayoutProps {
    children: React.ReactNode
}
export default function RoomLayout({children}: IRoomLayoutProps) {
    return <RoomLayoutWapper>
        {children}
    </RoomLayoutWapper>
}

const RoomLayoutWapper = styled.div`
    
`;

const MainContent = styled.div``;

const SideBar = styled.div``;
