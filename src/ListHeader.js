import React from 'react'
import TodoList from './TodoList'

function ListHeader(props) {
  return (
    <div className="main-grid-item">
      <h3>
        <span onClick={props.changeListDisplay}>{props.name}</span> &nbsp;
        <span onClick={props.deleteList}>X</span>
      </h3> 
      <TodoList listId={props.listId} />
    </div>   
  )
}

export default ListHeader