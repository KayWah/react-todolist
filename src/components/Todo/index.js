import React from 'react'

import {TodoWrapper} from './style'

import { Typography, Space, Checkbox, DatePicker } from 'antd';
import moment from 'moment';

const { Text, Link } = Typography;


const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

function Todo(props) {
  const {todo} = props
  console.log(props);

  function removeTodo(id) {
    console.log(id);
    props.removeTodo(id)
  }
  
  const updateTodo = (data) => {
    // const _checked = target.checked;
    console.log(data);
    props.updateTodo(data)
  }
  
  return (
    <TodoWrapper>
      <Checkbox defaultChecked={todo.status} className="chackbox" onChange={(e) => {updateTodo({...todo, status: e.target.checked})}} />
      {todo.title} -
      {/* <DatePicker defaultValue={moment(moment(parseInt(todo.create_time_format)).format('YYYY/MM/DD'), dateFormat)} format={dateFormat} /> */}
      {moment(parseInt(todo.create_time)).format('YYYY/MM/DD')} - 
      <Text type="danger" className="delete" onClick={() => {
        console.log(todo.id);
        removeTodo(todo.id)
      }}>
        删除
      </Text>

    </TodoWrapper>
  )
}

export default React.memo(Todo)