import React, { useEffect, useRef, useState } from "react";

//伪数据
import Todo from "../../components/Todo";
import NewTodo from "../../components/NewTodo";


import { indexDBSuccess, readAll, remove, update, add } from '../../api/indexDB'
import { findTodoIndex } from '../../api/libs'

import { message } from 'antd';


function Todolist(props) {
  const titleRef = useRef()

  const [todoData, setTodoData] = useState([]);

  const {match: {params: {id}}} = props

  const { route } = props;
  console.log(id);

  let data = [];

  useEffect(() => {
    setTimeout(() => {
      readAll().then(res => {
        console.log(res);
        setTodoData(res)
      })
    }, 1000);
  }, [])

  const postData = () => {
    indexDBSuccess(add).then(() => {
      console.log('提交成功');
      titleRef.current.value = ""
    })
  }

  const newTodo = (data, formRef) => {
    console.log(data);
    console.log(formRef);
    add(data, formRef).then(res => {
      console.log(res);
      message.success(res);
      formRef.current.resetFields()
      let a = JSON.parse(JSON.stringify(todoData));
      setTodoData([
        ...todoData, data
      ])
    })
  }

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
      const a = findTodoIndex(todoData, id)
      if (a > 0) {
        const data = JSON.parse(JSON.stringify(todoData));
        data.splice(a, 1)
        setTodoData(data)
      }
    })
  }

  function updateTodo(data) {
    update(data)
  }

  return (
    <div key="1">
      <NewTodo newTodo={newTodo}></NewTodo>
      {/*<div>*/}
      {/*  <input id="newTodo" ref={titleRef} />*/}
      {/*  <button onClick={() => postData()} >新建</button>*/}
      {/*</div>*/}

      {
        todoData.length > 0 ? todoData.map(todo => {
          return <Todo key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo}></Todo>
        }) : <div>暂无数据</div>
      }
    </div>
  )
}

export default React.memo(Todolist);