import React from 'react'
import TodoList from '../Todos/TodoList'

function ListHeader(props) {
  return (
    <div className="main-grid-item">
      <h2 className="main-grid-item-header">
        <span onClick={props.changeListDisplay}>{props.name}</span> &nbsp;
        <span onClick={props.deleteList}>X</span>
      </h2> 
      <TodoList 
        listId={props.listId}
        updateNumTodos={props.updateNumTodos}
     />
    </div>   
  )
}

export default ListHeader