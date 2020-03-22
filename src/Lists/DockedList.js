import React from 'react'


function DockedList(props) {
  return (
    <div className="dock-item" onClick={props.changeListDisplay}>
        <span>{props.name} ({props.numTodos})</span> &nbsp;
        {props.display ? <i className="fas fa-circle fa-xs"></i> : '' }
        {/* <span className="dock-item-delete" onClick={props.deleteList}>X</span> */}
    </div>
  )
}


export default DockedList