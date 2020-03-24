import React from 'react'

function TodoItem(props) {
  const isCompleted = props.completed 
  return (
    <div className="todo-item">
      <span onClick={props.toggleEditing} style={{textDecoration: isCompleted ? 'line-through' : 'none'}}>
        {props.name}
      </span>
      &nbsp; 
      {props.due ? props.due.toLocaleDateString() : ''}
      &nbsp;
      <span onClick={props.removeTodo}>
        X
      </span>
    </div>
  )
}

export default TodoItem