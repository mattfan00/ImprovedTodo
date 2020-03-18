import React from 'react'
import TodoList from './TodoList'

function ListHeader(props) {
  return (
    <div>
      <h2>{props.name} <span onClick={props.deleteList}>X</span></h2> 
      <TodoList listId={props.listId} />
    </div>   
  )
}

export default ListHeader