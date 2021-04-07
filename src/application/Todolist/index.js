import React, {useEffect, useRef, useState} from "react";

import {LoadingWrapper, TodoListWrapper} from './style'
import Todo from "../../components/Todo";
import NewTodo from "../../components/NewTodo";



import {indexDBSuccess, readAll, remove, update, add} from '../../api/indexDB'
import {findTodoIndex, isToday} from '../../api/libs'

import {message, Modal, Button} from 'antd';
import moment from "moment";


function Todolist(props) {

  const titleRef = useRef()

  const [loading, setLoading] = useState(true)

  const [todoData, setTodoData] = useState([]);

  const [type, setType] = useState('all');

  const [form, setForm] = useState(null);

  const [visible, setVisible] = useState(false);

  const {match: {params: {id}}} = props

  const {route} = props;

  useEffect(() => {
    setType(id)
    setTodoData([])
    setLoading(true)
    setTimeout(() => {
      readAll().then(res => {
        setTodoData(isToday(res, id))
        setLoading(false)
      }).catch(err => {
        console.log(err);
      })
    }, 500);
  }, [id])

  function getData () {
    readAll().then(res => {
      setTodoData(isToday(res, type))
    })
  }

  /*
  * 获取modal里面的子组件form
  * */
  const getForm = (form) => {
    setForm(form)
  }

  const modelForm = () => {
    form.validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          'schedule_time': fieldsValue['schedule_time'] ? moment(fieldsValue['schedule_time'].format('YYYY-MM-DD hh:mm:ss')).valueOf() : '',
          'status': fieldsValue['status'] === "true" ? true : false,
          'create_time': new Date().getTime()
        };
        add(values).then(res => {
          message.success(res);
          setTodoData([
            ...todoData, values
          ])
          setVisible(false)
        })
      }).catch(err => {
      console.log(err);
    })

  }
  const onReset = () => {
    form.resetFields()
  };
  function read(db) {
    var transaction = db.transaction(['todolist']);
    var objectStore = transaction.objectStore('todolist');


    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;

      if (cursor) {
        console.log(cursor);
        cursor.continue();
      } else {
        console.log('没有更多数据了！');
      }
    };
  }

  function removeTodo(id) {
    remove(id).then(res => {
        const data = JSON.parse(JSON.stringify(todoData));
      const a = findTodoIndex(data, id)
      console.log(a);
      data.splice(a, 1)
        setTodoData(data)
    })
  }

  function updateTodo(data) {
    update(data)
  }

  return (
    <TodoListWrapper key="1">
      <Button type="primary" onClick={() => setVisible(true)}>
        新增
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={[
          <Button key="formSubmit" type="primary" htmlType="submit" onClick={() => modelForm()}>
            提交
          </Button>,
          <Button key="formCancel" htmlType="button" onClick={() => onReset()}>
            重置
          </Button>
        ]}
      >
        <NewTodo key="newTodo"
          // newTodo={newTodo}
          getForm={getForm} actions={false}></NewTodo>
      </Modal>
      {
        loading ? <LoadingWrapper>数据加载中</LoadingWrapper> : todoData.length > 0 ? todoData.map(todo => {
          return <Todo key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo}></Todo>
        }) : <LoadingWrapper>暂无数据</LoadingWrapper>
      }
    </TodoListWrapper>
  )
}

export default React.memo(Todolist);