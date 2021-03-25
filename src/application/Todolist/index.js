import React from "react";

//伪数据
import * as today from '../../RequestJson/today.json'
import * as all from '../../RequestJson/all.json'
import Todo from "../../components/Todo";

function Todolist(props) {
  const {route, location: {state: {id}}} = props;
  console.log(id);
  let data = []
  const {data: todayData} = today.default;
  const {data: allData} = all.default;
  console.log(data);
  id === 'all' ? data = allData : data = todayData
  return (
    <div>
      todolist {id ? id : null}
      {
        data.map(todo => {
          return <Todo todo={todo}></Todo>
        })
      }
    </div>
  )
}

export default React.memo(Todolist);