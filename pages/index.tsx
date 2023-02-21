import Head from 'next/head';
import React from 'react';
// import { Inter } from '@next/font/google';
import DefaultLayout from 'Layouts/DefaultLayout/DefaultLayout';
import Toolbar from 'Components/Toolbar/Toolbar';
import RoomList from 'Components/Rooms/RoomList/RoomList';
// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Welcome to EngTalkForDev</title>
                <meta name="description" content="English talk for developer" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DefaultLayout>
                <Toolbar />
                <RoomList />
            </DefaultLayout>
        </>
    );
}
