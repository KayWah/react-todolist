import React from 'react';

import moment from 'moment';

import { Form, Input, InputNumber, Button, DatePicker, Select } from 'antd';
const { Option } = Select;


function NewTodo(props) {
    console.log(props);
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    };
    const small = {
        span: 2
    }

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'schedule_time': moment(fieldsValue['schedule_time'].format('YYYY-MM-DD hh:mm:ss')).valueOf(),
            'create_time': new Date().getTime()
        };
        console.log(values);
        props.newTodo(values)
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['title']} label="标题" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name={['status']} label="状态"
            >
                <Select
                    placeholder="Please select a country"
                    style={{ width: 140, display: 'flex' }}
                >
                    <Option value="false">未完成</Option>
                    <Option value="true">已完成</Option>
                </Select>
            </Form.Item>
            <Form.Item name={['schedule_time']} label="日程时间" >
                <DatePicker showTime style={{ width: 200, display: 'flex' }} format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item name={['remark']} label="备注">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
            </Button>
            </Form.Item>
        </Form>
    );
}

export default React.memo(NewTodo);