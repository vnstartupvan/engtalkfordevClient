import React, { useEffect, useState } from 'react';
import { Select, Form, Input, Button } from 'antd';
import { RoomInfoPayload } from '@libs/models/room';

type RequiredMark = boolean | 'optional';
const { Option } = Select;

interface IFormModalProps {
    handleAfterSubmit: () => void;
    handleSubmit: (values: RoomInfoPayload) => void;
}
const FormModal = ({ handleAfterSubmit, handleSubmit }: IFormModalProps) => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] =
        useState<RequiredMark>('optional');

    const onRequiredTypeChange = ({
        requiredMarkValue,
    }: {
        requiredMarkValue: RequiredMark;
    }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const RenderLimitOption = (limit: number): React.ReactNode => {
        let i = 0;
        let options = [];
        do {
            const value = i + 1;
            const option = (
                <Option key={value} value={value}>
                    {value}
                </Option>
            );
            options.push(option);
            i++;
        } while (i < limit);
        return options;
    };

    const onFinish = (values: RoomInfoPayload) => {
        handleSubmit(values);
        handleAfterSubmit();
        form.resetFields();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ requiredMarkValue: requiredMark }}
            onValuesChange={onRequiredTypeChange}
            onFinish={onFinish}
            requiredMark={requiredMark}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 24,
            }}
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                    name="topic"
                    label="Topic"
                    style={{ display: 'inline-block', width: 'calc(60%)' }}
                    required
                    initialValue="any"
                >
                    <Input placeholder="Any Topic" />
                </Form.Item>
                <Form.Item
                    name="userLimit"
                    label="Maximun People"
                    initialValue="10"
                    style={{ display: 'inline-block', width: 'calc(40%)' }}
                >
                    <Select placeholder="Unlimited" allowClear>
                        {RenderLimitOption(10)}
                    </Select>
                </Form.Item>
            </Form.Item>

            <Form.Item name="language" label="Language" initialValue="any">
                <Select placeholder="Any" allowClear>
                    <Option value="javascript">JavaScript</Option>
                    <Option value="typescript">TypeScript</Option>
                    <Option value="java">Java</Option>
                    <Option value="c++">C++</Option>
                    <Option value=".net">.Net</Option>
                    <Option value="php">PHP</Option>
                    <Option value="nodejs">NodeJS</Option>
                    <Option value="c#">C#</Option>
                </Select>
            </Form.Item>

            <Form.Item name="level" label="Level" initialValue="any">
                <Select placeholder="Any" allowClear>
                    <Option value="starter">Starter</Option>
                    <Option value="fresher">Fresher</Option>
                    <Option value="junior">Junior</Option>
                    <Option value="middle">Middle</Option>
                    <Option value="senior">Senior</Option>
                </Select>
            </Form.Item>

            <Form.Item colon={false}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormModal;
