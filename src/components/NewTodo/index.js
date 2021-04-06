import React, {useRef, useEffect} from 'react';

import moment from 'moment';

import {Form, Input, InputNumber, Button, DatePicker, Select} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';


const {Option} = Select;

function NewTodo(props) {
  const layout = {
    labelCol: {span: 2},
    wrapperCol: {span: 22},
  };

  const {actions} = props
  const {newTodo} = props

  const formRef = useRef()

  const [form] = Form.useForm();

  useEffect(() => {
    formRef.current.resetFields()
  })

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
      'schedule_time': fieldsValue['schedule_time'] ? moment(fieldsValue['schedule_time'].format('YYYY-MM-DD hh:mm:ss')).valueOf() : '',
      'status': fieldsValue['status'] === "true" ? true : false,
      'create_time': new Date().getTime()
    };
    newTodo(values, formRef);
  };

  const onReset = () => {
    formRef.current.resetFields()
  };

  useEffect(() => {
    props.getForm(form)
  }, [])

  return (
    <Form {...layout} ref={formRef} name="nest-messages"
          form={form}
          onFinish={onFinish}
          validateMessages={validateMessages}>
      <Form.Item name={['title']} label="标题" rules={[{required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item
        name={['status']} label="状态"
      >
        <Select
          // initialvalues="false"
          defaultValue="false"
          placeholder="请选择状态"
          style={{width: 140, display: 'flex'}}
        >
          <Option value="false">未完成</Option>
          <Option value="true">已完成</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['schedule_time']} label="日程时间">
        <DatePicker locale={locale} showTime style={{width: 200, display: 'flex'}} format="YYYY-MM-DD HH:mm:ss"/>
      </Form.Item>
      <Form.Item name={['remark']} label="备注">
        <Input.TextArea/>
      </Form.Item>
      {
        actions ? <Form.Item wrapperCol={{...layout.wrapperCol, offset: 0}}>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
          <Button htmlType="button" onClick={() => onReset()}>
            重置
          </Button>
        </Form.Item> : null
      }

    </Form>
  );
}

export default React.memo(NewTodo);