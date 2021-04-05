import React from 'react'

import {TodoWrapper} from './style'

import { Typography, Space, Checkbox, DatePicker } from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Text, Link } = Typography;


const dateFormat = 'YYYY/MM/DD hh:mm:ss';
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
      <div className="task-item">
        <div className="content">
          <div className="info">
            {todo.title}
            {/*{moment(parseInt(todo.create_time)).format('YYYY/MM/DD')}*/}
          </div>
          <Text type="danger" className="delete" onClick={() => {
            removeTodo(todo.id)
          }}>
            删除
          </Text>
        </div>
        <div className="actions">
          <DatePicker locale={locale} defaultValue={
            todo.schedule_time ?  moment(moment(parseInt(todo.schedule_time)).format('YYYY/MM/DD hh:mm:ss'), dateFormat)  : ''
          } format={dateFormat} showTime />
        </div>
      </div>

    </TodoWrapper>
  )
}

export default React.memo(Todo)