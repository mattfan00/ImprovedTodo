import React from 'react'

function DayTodos(props) {
  const todos = props.todos.map(todo => 
    <div key={todo._id}>
      {todo.name}
    </div>
  )

  return (
    <div>
      {todos}
    </div>
  )
}

export default DayTodos