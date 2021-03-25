import React from 'react'
function Todo(props) {
  const {todo} = props
  return (
    <div key={todo.id}>
      {todo.title} -
      {todo.create_time_format} -
      <input type="checkbox" defaultChecked={todo.status}/>
    </div>
  )
}

export default React.memo(Todo)