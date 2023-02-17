import React, {useState, useRef, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import Head from 'next/head'
import DefaultLayout from 'Layouts/DefaultLayout/DefaultLayout'
import styled from 'styled-components'
import ChatBar from 'Components/Room/ChatBar/ChatBar'

function RoomTemplate() {

    return (
        <>
            <Head>
                <title>EngTalkforDev</title>
                <meta name="description" content="English talk for developer" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DefaultLayout>
                <RoomLayoutWapper>
                    <MainContent>Main</MainContent>
                    <SideBar>
                        <ChatBar/>
                    </SideBar>
                </RoomLayoutWapper>
            </DefaultLayout>
        </>
    )
}

const RoomLayoutWapper = styled.div`
    display: flex;
    width: 100%;
`

const MainContent = styled.div`
    width: 70%;
`

const SideBar = styled.div`
    width: 30%;
`

export default RoomTemplate
