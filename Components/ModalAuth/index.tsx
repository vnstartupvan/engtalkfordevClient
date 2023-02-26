import { Utils } from '@utils/common/Utils';
import { Modal, Button } from 'antd';
import LoginForm from 'Components/LoginForm';
import RegisterForm from 'Components/RegisterForm';
import React, { useState } from 'react';
import styled from 'styled-components';

interface IModalAuthProps {
    isOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

type AuthFormType = 'login' | 'register';

const ModalAuth: React.FC<IModalAuthProps> = ({
    isOpen,
    handleOk,
    handleCancel,
}) => {
    const [authForm, setAuthForm] = useState<AuthFormType>('login');

    const handleSwitchBtn = () => {
        if (authForm === 'login') {
            setAuthForm('register');
        } else {
            setAuthForm('login');
        }
    };
    
    return (
        <ModalAuthContainer
            title={Utils.Capitalize(authForm)}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                <StyledButton onClick={handleSwitchBtn}>
                    {authForm === 'login'
                        ? 'Not a member yet! Sign up.'
                        : 'Login'}
                </StyledButton>
            </div>
            {authForm === 'login' ? (
                <LoginForm handleOk={handleOk} />
            ) : (
                <RegisterForm handleOk={handleOk} />
            )}
        </ModalAuthContainer>
    );
};

const ModalAuthContainer = styled(Modal)``;

const StyledButton = styled(Button)`
    &&&:hover {
        border-color: #ccc;
        color: #000;
        span {
            text-decoration: underline;
        }
    }
`;

export default ModalAuth;
