import React from 'react'
import TodoList from './TodoList'

function ListHeader(props) {
  return (
    <div>
      <h2>
        <span onClick={props.changeListDisplay}>{props.name}</span> &nbsp;
        <span onClick={props.deleteList}>X</span>
      </h2> 
      <TodoList listId={props.listId} />
    </div>   
  )
}

export default ListHeader