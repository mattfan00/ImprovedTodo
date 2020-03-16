import React from 'react'

function TodoItem(props) {
  const isCompleted = props.completed 

  return (
    <li>
      <span onClick={props.toggleCompleted} style={{textDecoration: isCompleted ? 'line-through' : 'none'}}>
        {props.name}
      </span>
      &nbsp;  
      <span onClick={props.removeTodo}>
        X
      </span>
    </li>
  )
}

export default TodoItem