import { Modal, Button } from 'antd';
import LoginForm from 'Components/LoginForm';
import RegisterForm from 'Components/RegisterForm';
import React, { useState } from 'react';
import styled from 'styled-components';
interface IModalAuthProps {
    title?: string;
    isOpen: boolean;
    handleOk: () => void;
    handleCancel?: () => void;
}
function ModalAuth({ title, isOpen, handleOk, handleCancel }: IModalAuthProps) {
    type AuthFormType = 'login' | 'register';
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
            title={title}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {authForm === 'login' ? <LoginForm /> : <RegisterForm />}
            <div style={{ textAlign: 'center' }}>
                <Button onClick={handleSwitchBtn}>
                    {authForm === 'login'
                        ? 'Not a member yet! Sign up.'
                        : 'Login'}
                </Button>
            </div>
        </ModalAuthContainer>
    );
}

const ModalAuthContainer = styled(Modal)``;

export default ModalAuth;
