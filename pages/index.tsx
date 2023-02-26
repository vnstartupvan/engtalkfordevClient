import Head from 'next/head';
import React from 'react';
// import { Inter } from '@next/font/google';
import DefaultLayout from 'Layouts/DefaultLayout/DefaultLayout';
import Toolbar from 'Components/Toolbar/Toolbar';
import RoomList from 'Components/Rooms/RoomList/RoomList';
// const inter = Inter({ subsets: ['latin'] });
import { AppDispatch } from '../libs/redux/store';
import { RootState } from 'libs/redux/store';
import { useEffect } from 'react';
import { getProfile } from '@libs/api/user';
import { updateProfile } from '@libs/redux/reducers/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const dispatch: AppDispatch = useDispatch();
    const myProfile = useSelector((state: RootState) => state.auth.myProfile);

    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const user = await getProfile();
                console.log(user);
                dispatch(updateProfile(user));
            } catch (error) {}
        }
        if (!myProfile) getMyProfile();
    }, []);

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
