import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from 'libs/api/auth';
import { AppDispatch } from 'libs/redux/store';
import { useDispatch } from 'react-redux';
import { updateProfile } from '@libs/redux/reducers/AuthReducer';
import { Utils } from '@utils/common/Utils';

export interface ILoginForm {
    handleOk: () => void;
}

const LoginForm = ({ handleOk }: ILoginForm) => {
    const dispatch: AppDispatch = useDispatch();

    const onFinish = async (values: any) => {
        try {
            const { username, password } = values;
            const loginReponse = await login(username, password);

            dispatch(updateProfile(loginReponse.user));
            Utils.setCookie('accessToken', loginReponse.accessToken);
            Utils.setCookie('refreshToken', loginReponse.refreshToken);
            handleOk();
        } catch (error) {}
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
