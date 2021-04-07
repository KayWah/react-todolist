import React from 'react'

import {TodoWrapper} from './style'

import { Typography, Button, Checkbox, DatePicker } from 'antd';

import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Text, Paragraph } = Typography;

const dateFormat = 'YYYY/MM/DD hh:mm:ss';

function Todo(props) {
  const {todo} = props

  function removeTodo(id) {
    props.removeTodo(id)
  }
  
  const updateTodo = (data) => {
    props.updateTodo(data)
  }

  const btnSize = 'small'
  
  return (
    <TodoWrapper>
      <Checkbox defaultChecked={todo.status} className="chackbox" onChange={(e) => {updateTodo({...todo, status: e.target.checked})}} />
      <div className="task-item">
        <div className="content">
          <div className="info">
            <Paragraph copyable>{todo.title}</Paragraph>
          </div>
          <div className="action-bar">
           {
             todo.status ? null :
               <Button type="link" primary className="edit action" size={btnSize} onClick={() => {
               removeTodo(todo.id)
             }}>
               编辑
             </Button>
           }
            <Button type="link" danger className=" action" size={btnSize} onClick={() => {
              removeTodo(todo.id)
            }}>
              删除
            </Button>
         </div>
        </div>
        <div className="actions">
          <DatePicker size="small" locale={locale} defaultValue={
            todo.schedule_time ?  moment(moment(parseInt(todo.schedule_time)).format('YYYY/MM/DD hh:mm:ss'), dateFormat)  : ''
          } format={dateFormat} showTime />
        </div>
      </div>
    </TodoWrapper>
  )
}

export default React.memo(Todo)