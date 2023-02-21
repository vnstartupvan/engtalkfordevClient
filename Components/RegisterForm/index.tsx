import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const RegisterForm: React.FC = () => (
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateMessages={validateMessages}
    >
        <Form.Item
            label="Full name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your name!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                {
                    type: 'email',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={[
                {
                    required: true,
                    message: 'Please input your confirm password!',
                },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);

export default RegisterForm;
