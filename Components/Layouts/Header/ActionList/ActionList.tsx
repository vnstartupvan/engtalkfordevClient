import React, { useState } from 'react';
import { StyledActionList, UserIcon, AuthAction } from '../Header.styled';
import ModalAuth from 'Components/ModalAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@libs/redux/store';
import { CaretDownOutlined } from '@ant-design/icons';
import { Utils } from '@utils/common/Utils';
import { Tooltip } from 'antd';
import LogoutButton from './LogoutButton';
function ActionList() {
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
        <>
            <StyledActionList>
                {!myProfile ? (
                    <UserIcon onClick={showModal}>
                        <i className="fa fa-user"></i>
                    </UserIcon>
                ) : (
                    <Tooltip color={'#fff'} title={<LogoutButton />}>
                        <AuthAction>
                            <i
                                style={{
                                    borderRadius: '50%',
                                    padding: '10px',
                                    backgroundColor: ' #b3d4fc',
                                }}
                                className="fa fa-user"
                            ></i>
                            <span>{Utils.getLastword(myProfile.fullname)}</span>
                            <CaretDownOutlined />
                        </AuthAction>
                    </Tooltip>
                )}
            </StyledActionList>
            <ModalAuth
                isOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </>
    );
}

export default ActionList;
