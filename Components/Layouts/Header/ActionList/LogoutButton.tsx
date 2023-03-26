import { Utils } from '@utils/common/Utils';
import { Button } from 'antd';
import React from 'react';
import { AppDispatch } from 'libs/redux/store';
import { useDispatch } from 'react-redux';
import { logOut } from '@libs/redux/reducers/AuthReducer';

function LogoutButton() {
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOut());
        Utils.removeCookie('refreshToken');
        Utils.removeCookie('accessToken');
    };

    return (
        <Button onClick={handleLogout} type="primary">
            Logout!
        </Button>
    );
}

export default LogoutButton;
