import Head from 'next/head';
import DefaultLayout from 'Layouts/DefaultLayout/DefaultLayout';
import Toolbar from 'Components/Toolbar/Toolbar';
import RoomList from 'Components/Rooms/RoomList/RoomList';
import { useEffect } from 'react';
import { getProfile } from '@libs/api/user';
import { updateProfile } from '@libs/redux/reducers/AuthReducer';
import { useAppDispatch, useAppSelector } from 'Hooks/UseReduxStore';

export default function Home() {
    const dispatch = useAppDispatch();
    const myProfile = useAppSelector((state) => state.auth.myProfile);

    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const user = await getProfile();
                dispatch(updateProfile(user));
            } catch (error) {}
        };

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
